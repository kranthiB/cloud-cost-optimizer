package com.cloud.costoptimizer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
public class CostOptimizerApplication {
    public static void main(String[] args) {
        SpringApplication.run(CostOptimizerApplication.class, args);
    }
}