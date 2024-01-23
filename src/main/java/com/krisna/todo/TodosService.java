package com.krisna.todo;

import org.bson.types.ObjectId;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Stream;
import java.util.Date;
import java.util.Calendar;
import java.util.TimeZone;

@Service
public class TodosService {
    @Autowired
    private TodosRepository todosRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    MongoTemplate mongoTemplate;

    public JSONObject createTodo(Todos todos){
        JSONObject resp = new JSONObject();
        try {
            todosRepository.save(todos);
            resp.put("message","Sucessfully created");
            resp.put("status",true);
            return resp;
        } catch (Exception err){
            resp.put("message","Action failed");
            resp.put("error",err);
            resp.put("status",false);
            return resp;
        }

    }

    public JSONObject getAllTodos(String search){
        String query = search != null ? search : "";
        Criteria regex = Criteria.where("goal").regex(".*"+query+".*", "i");
        List<Todos> todos = mongoTemplate.find(new Query().addCriteria(regex), Todos.class);
        JSONObject resp = new JSONObject();

        if(!todos.isEmpty()){
            resp.put("data",todos);
            resp.put("status",true);
            return resp;
        } else {
            resp.put("message","No Todos yet");
            resp.put("status",false);
            return resp;
        }
    }

    public JSONObject getSingleTodos(ObjectId _id){
        Optional<Todos> todo = todosRepository.findById(_id);
        JSONObject resp = new JSONObject();

        if(!todo.isEmpty()){
            resp.put("data",todo);
            resp.put("status",true);
            return resp;
        } else {
            resp.put("message","Todo not found");
            resp.put("status",false);
            return resp;
        }
    }

    public JSONObject deleteTodo(ObjectId _id){
        JSONObject resp = new JSONObject();
        try{
            Optional<Todos> todo = todosRepository.findById(_id);
            if(!todo.isEmpty()){
                todosRepository.deleteById(_id);
                resp.put("message","Deleted successfully");
                resp.put("status",true);
                return resp;
            } else {
                resp.put("message","No Such Todo found");
                resp.put("status",false);
                return resp;
            }

        } catch (Exception err){
            resp.put("message","Action failed");
            resp.put("status",false);
            return resp;
        }

    }

    public JSONObject editTodo(String goal,String deadline, ObjectId _id){
        Optional<Todos> recentTodo = todosRepository.findById(_id);

        JSONObject resp = new JSONObject();
        if(!recentTodo.isEmpty()){
            try {
                Query query = new Query(Criteria.where("_id").is(_id));
                Update update = new Update();
                update.set("goal",goal);
                update.set("deadline",deadline);
                mongoTemplate.findAndModify(query,update, Todos.class);
                resp.put("message", "Successfuly Changed");
                resp.put("status", true);
                return resp;
            } catch (Exception err){
                resp.put("message","Failed to change");
                resp.put("status",false);
                return resp;
            }
        } else {
            resp.put("message","Error: Failed to change");
            resp.put("status",false);
            return resp;
        }
    }

    public  JSONObject addMission(ObjectId _id,Mission mission){
        Optional<Todos> recentTodo = todosRepository.findById(_id);

        JSONObject resp = new JSONObject();
        if(!recentTodo.isEmpty()){
            try {
                mongoTemplate.update(Todos.class)
                        .matching(Criteria.where("_id").is(_id))
                        .apply(new Update().push("missions").value(mission))
                        .first();
                validateGoal(_id);
                resp.put("message", "Successfuly Added");
                resp.put("status", true);
                return resp;
            } catch (Exception err){
                resp.put("message","Failed to change");
                resp.put("status",false);
                return resp;
            }
        } else {
            resp.put("message","Error: Todo not found");
            resp.put("status",false);
            return resp;
        }
    }

    public JSONObject editMission(ObjectId _id, String _idMission, String mission){
        Optional<Todos> todo = todosRepository.findById(_id);

        ObjectId idMission = new ObjectId(_idMission);
        JSONObject resp = new JSONObject();
        if(!todo.isEmpty()){
            Query query = new Query(Criteria.where("_id").is(_id).and("missions._id").is(idMission));
            Update update = new Update().set("missions.$[idm].mission",mission)
                    .filterArray(Criteria.where("idm._id").is(idMission));

            try{
                mongoTemplate.findAndModify(query,update, Todos.class);
                resp.put("message", "Successfuly updated");
                resp.put("status", true);
                return resp;
            } catch (Exception err){
                resp.put("message", "Update failed");
                resp.put("status", false);
                return resp;
            }
        } else {
            resp.put("message", "Todo not found");
            resp.put("status", false);
            return resp;
        }
    }

    public JSONObject checkMission(ObjectId _id, ObjectId _idMission){
        Optional<Todos> todo = todosRepository.findById(_id);
        JSONObject resp = new JSONObject();

        if(!todo.isEmpty()){
            Query query1 = new Query(Criteria.where("_id").is(_id).and("missions._id").is(_idMission));
            Boolean exist = mongoTemplate.exists(query1, Todos.class);
            if(!exist){
                resp.put("message", "Mission not found");
                resp.put("status", false);
                return resp;
            }

            Query query2 = new Query(Criteria.where("_id").is(_id).and("missions._id").is(_idMission).and("missions").elemMatch(Criteria.where("_id").is(_idMission).and("status").is(true)));

            Boolean checked = mongoTemplate.exists(query2, Todos.class);

            Query query = new Query();
            Update update = new Update();
            if(!checked){
                query.addCriteria(Criteria.where("_id").is(_id).and("missions._id").is(_idMission));
                update.set("missions.$[idm].status",true)
                        .filterArray(Criteria.where("idm._id").is(_idMission));
            } else {
                query.addCriteria(Criteria.where("_id").is(_id).and("missions._id").is(_idMission));
                update.set("missions.$[idm].status",false)
                        .filterArray(Criteria.where("idm._id").is(_idMission));
            }
            try{
                mongoTemplate.findAndModify(query,update, Todos.class);
                validateGoal(_id);
                resp.put("message", (checked ? "Successfully unchecked" : "Successfully checked"));
                resp.put("status", true);
                return resp;
            } catch (Exception err){
                resp.put("message", "Action failed");
                resp.put("status", false);
                return resp;
            }
        } else {
            resp.put("message", "Todo not found");
            resp.put("status", false);
            return resp;
        }

    }

    public JSONObject deleteMission(ObjectId _id, ObjectId _idMission){
        Optional<Todos> todo = todosRepository.findById(_id);
        JSONObject resp = new JSONObject();

        if(!todo.isEmpty()){
            Query query1 = new Query(Criteria.where("_id").is(_id).and("missions._id").is(_idMission).and("missions").elemMatch(Criteria.where("_id").is(_idMission)));
            Boolean exist = mongoTemplate.exists(query1, Todos.class);
            if(!exist){
                resp.put("message", "Mission not found");
                resp.put("status", false);
                return resp;
            }
            try {
                Update update = new Update();
                update.pull("missions", new Query(Criteria.where("_id").in(_idMission)));
                mongoTemplate.findAndModify(query1,update, Todos.class);
                validateGoal(_id);

                resp.put("message", "Delete success");
                resp.put("status", true);
                return resp;
            } catch (Exception err){
                resp.put("message", "Delete failed");
                resp.put("status", false);
                return resp;
            }

        }else {
            resp.put("message", "Todo not found");
            resp.put("status", false);
            return resp;
        }
    }

    public boolean validateGoal (ObjectId _id){
        Query query = new Query(Criteria.where("_id").is(_id));
        Todos todos =mongoTemplate.findOne(query, Todos.class);

            List<Mission> missions = todos.getMissions();


            if(!missions.isEmpty()){
                List<Mission> misionFalse= new ArrayList<Mission>();

                for(Mission mision :missions){
                    if(mision.getStatus()==false){
                        misionFalse.add(mision);
                    }
                }
                if(!misionFalse.isEmpty()){
                    Query query1 = new Query(Criteria.where("_id").is(_id));
                    Update update = new Update();
                    update.set("status","ongoing");
                    try {
                        mongoTemplate.findAndModify(query,update, Todos.class);
                        return true;
                    } catch (Exception err){
                        return false;
                    }
                } else {
                    Query query1 = new Query(Criteria.where("_id").is(_id));
                    Update update = new Update();
                    update.set("status","complete");
                    try {
                        mongoTemplate.findAndModify(query,update, Todos.class);
                        return true;
                    } catch (Exception err){
                        return false;
                    }
                }
            } else {
                return true;
            }

    }
    public JSONObject findAllAndSortByDeadline() {
        List<Todos> todo = todosRepository.findAllByOrderByDeadlineAsc();
        JSONObject resp = new JSONObject();
        resp.put("status",true);
        resp.put("data",todo);
        return resp;
    }
    
    public int checkDeadline(){
        List<Todos> todos = todosRepository.findAll();
        int count = 0;
        try{
            for (Todos todo: todos
            ) {
                Date currentDate = new Date();
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);

                String dateInString = todo.getDeadline();
                Date date = formatter.parse(dateInString);
                Date deadline = formatter.parse(dateInString);

                long differenceInDays = (deadline.getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000);
//                System.out.println(differenceInDays);
                int daysRemaining = (int) Math.floor(differenceInDays);
//                System.out.println(daysRemaining);
                if ( daysRemaining > 0 && daysRemaining <= 7) {
                    // Handle the todo with a deadline of 7 or 30 days remaining
                    count+=1;
                }
            }
            if(count >=1){
                String string = String.format("Halo ketutk,\n\nKami dari DreamSetter ingin mengingatkan anda bahwa terdapat %s goal yang perlu diselesaikan dalam waktu kurang dari 7 hari. \n\nTetap semangat untuk mencapai goals anda.\n\nTerimakasih.",count);
                Email emailDetails = new Email("ketutkrisnakertajaya@gmail.com",string,"[Reminder] DreamSetter","");
                String emailResult = emailService.sendSimpleMail(emailDetails);
            }
        } catch (java.text.ParseException err){
            err.printStackTrace();
        }

        return count;

    }

}










