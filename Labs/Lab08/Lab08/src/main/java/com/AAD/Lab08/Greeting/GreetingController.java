package com.AAD.lab08.Greeting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.SessionScope;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class GreetingController {
    @Autowired
    private GreetingService greetingService;

    @GetMapping("/greet")
    public String greet() {
        return greetingService.greet();
    }
    
}
interface GreetingService {
    String greet();
}
@Component("englishGreetingService")
@SessionScope
class EnglishGreetingService implements GreetingService{
    @Override
    public String greet() {
        return "Hello my dear teacher";
    }
}