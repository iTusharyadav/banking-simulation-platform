package banking.simulationplatform.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import banking.simulationplatform.exceptions.BadApiRequestException;
import banking.simulationplatform.service.FileService;

@Service
public class FileServiceImpl implements FileService {

    private static final Logger logger = LoggerFactory.getLogger(FileServiceImpl.class);

    @Override
    public String uploadFile(MultipartFile file, String path) throws IOException {
        String originalFilename = file.getOriginalFilename();
        logger.info("Uploading file: {}", originalFilename);

        if (originalFilename == null || !originalFilename.contains(".")) {
            throw new BadApiRequestException("Invalid file name");
        }

        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        if (!List.of(".png", ".jpg", ".jpeg").contains(extension.toLowerCase())) {
            throw new BadApiRequestException("Unsupported file type: " + extension);
        }

        String newFileName = UUID.randomUUID() + extension;
        String fullPath = path + File.separator + newFileName;

        File folder = new File(path);
        if (!folder.exists()) folder.mkdirs();

        Files.copy(file.getInputStream(), Paths.get(fullPath));
        logger.info("File uploaded successfully at {}", fullPath);

        return newFileName;
    }

    @Override
    public InputStream getResource(String path, String name) throws FileNotFoundException {
        String fullPath = path + File.separator + name;
        return new FileInputStream(fullPath);
    }
}
