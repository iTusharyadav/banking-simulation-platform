package banking.simulationplatform.service;

import banking.simulationplatform.model.Mail;

/**
 * Business interface for handling transactional and user email notifications.
 */
public interface MailService {

    void send(Mail mail);

    void transactionMail(String to, String subject, String body);

    void sendMail(String email, String link);
}



