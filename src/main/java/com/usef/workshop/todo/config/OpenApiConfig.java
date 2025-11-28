package com.usef.workshop.todo.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;

/**
 * @author HP
 **/
public class OpenApiConfig {
    @Bean
    public OpenAPI taskServiceApi(){
        return new OpenAPI()
                .info(new Info()
                        .title("Task Service Api")
                        .description("This is the REST API for Task Service")
                        .version("v0.0.1")
                        .license(new License().name("apache 2.0")))
                .externalDocs(new ExternalDocumentation()
                        .description("You can refer to the Task Service Wiki Documentation !")
                        .url("http:://order-service-dummy-url.com/docs"));
    }
}
