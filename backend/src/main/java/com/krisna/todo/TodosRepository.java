package com.krisna.todo;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodosRepository extends MongoRepository<Todos, ObjectId> {
//    Optional<Movie> findMovieByImdbId(String imdbId);
    List<Todos> findAllByOrderByDeadlineAsc();
}
