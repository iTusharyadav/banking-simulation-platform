package banking.simulationplatform.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import banking.simulationplatform.model.Mail;
import banking.simulationplatform.service.MailService;

@Service
public class MailServiceImpl implements MailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void send(Mail mail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("noreply@bankingsimulation.com");
        message.setSubject(mail.subject);
        message.setText(mail.body + "\n\nFrom: " + mail.email + "\nSent Date: " + mail.sentDate);
        mailSender.send(message);
    }

    @Override
    public void transactionMail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    @Override
    public void sendMail(String email, String link) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset - Banking Simulation");
        message.setText("Click the following link to reset your password:\n" + link);
        mailSender.send(message);
    }
}
