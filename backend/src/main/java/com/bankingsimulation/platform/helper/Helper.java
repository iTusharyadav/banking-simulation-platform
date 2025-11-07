package banking.simulationplatform.utility;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ThreadLocalRandom;
import lombok.extern.slf4j.Slf4j;

/**
 * Utility class providing helper methods for account generation and timestamps.
 */
@Slf4j
public class Helper {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final DateTimeFormatter TIME_FORMAT = DateTimeFormatter.ofPattern("HH:mm:ss");

    /**
     * Generates a random bank account number within a predefined range.
     */
    public static long generateAccountNo() {
        long min = 40000000L;
        long max = 80000000L;
        long accountNumber = ThreadLocalRandom.current().nextLong(min, max + 1);
        log.info("Generated Account Number: {}", accountNumber);
        return accountNumber;
    }

    /**
     * Returns the current date in dd/MM/yyyy format.
     */
    public static String dateStamp() {
        String date = LocalDateTime.now().format(DATE_FORMAT);
        log.debug("Generated Date Stamp: {}", date);
        return date;
    }

    /**
     * Returns the current time in HH:mm:ss format.
     */
    public static String timeStamp() {
        String time = LocalDateTime.now().format(TIME_FORMAT);
        log.debug("Generated Time Stamp: {}", time);
        return time;
    }
}
