package core.organization.controllers;

import core.organization.models.Operator;
import core.organization.services.OperatorService;
import core.util.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/operator")
public class OperatorController {

    @Autowired
    OperatorService opsService;

    @PostMapping("/addNew")
    private String addNewOperator(@RequestBody Operator ops) {
        return opsService.saveOperator(ops);
    }

    @PostMapping("/login")
    private boolean opsLogin(@RequestBody LoginRequest loginRequest) {
        return opsService.opsLogin(loginRequest);
    }

}
