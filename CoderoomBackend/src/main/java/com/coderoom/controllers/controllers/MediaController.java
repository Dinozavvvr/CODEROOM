package com.coderoom.controllers.controllers;

import com.coderoom.services.files.FilesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * created: 25-04-2021 - 17:27
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@CrossOrigin(originPatterns = "*")
@Controller
public class MediaController {

    @Autowired
    private FilesService filesService;

    @GetMapping("/api/v.1/images/{url}")
    public @ResponseBody byte[] getImage(@PathVariable String url) {
        return filesService.getImage(url);
    }

}
