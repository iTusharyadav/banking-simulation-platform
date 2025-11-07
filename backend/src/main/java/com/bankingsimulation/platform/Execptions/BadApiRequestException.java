package banking.simulationplatform.exceptions;

/**
 * Custom exception for handling invalid or malformed API requests.
 */
public class BadApiRequestException extends RuntimeException {

    public BadApiRequestException(String message) {
        super(message);
    }

    public BadApiRequestException() {
        super("Invalid API Request");
    }
}
