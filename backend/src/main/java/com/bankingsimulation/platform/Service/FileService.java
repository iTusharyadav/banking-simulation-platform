package banking.simulationplatform.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import org.springframework.web.multipart.MultipartFile;

/**
 * Business interface for managing file uploads and downloads.
 */
public interface FileService {

    String uploadFile(MultipartFile file, String path) throws IOException;

    InputStream getResource(String path, String fileName) throws FileNotFoundException;
}
