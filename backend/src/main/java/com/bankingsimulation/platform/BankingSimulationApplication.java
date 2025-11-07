package com.bankingsimulation.platform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the Banking Simulation Platform application.
 * A simple, modular, and secure online banking simulator.
 */
@SpringBootApplication
public class BankingSimulationApplication {

    public static void main(String[] args) {
        System.out.println("🚀 Launching Banking Simulation Platform...");
        SpringApplication.run(BankingSimulationApplication.class, args);
        System.out.println("✅ Banking Simulation Platform started successfully!");
    }
}
