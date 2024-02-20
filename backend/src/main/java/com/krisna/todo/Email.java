package com.krisna.todo;

// Importing required classes
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Annotations
@Data
@NoArgsConstructor
// Class
public class Email {

    // Class data members
    private String recipient;
    private String msgBody;
    private String subject;
    private String attachment;
    public Email(String recipient, String msgBody, String subject, String attachment) {
        this.recipient = recipient;
        this.msgBody = msgBody;
        this.subject = subject;
        this.attachment = attachment;
    }
    public Email(String recipient, String subject, String msgBody) {
        // Assuming a default value for the attachment parameter
        this(recipient, subject, msgBody, "");
    }
    public String getRecipient() {
        return recipient;
    }

    public String getMsgBody() {
        return msgBody;
    }

    public String getSubject() {
        return subject;
    }

    public String getAttachment() {
        return attachment;
    }
}
