package com.pixelforge.studio.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller serving the pages of PixelForge Studio online portfolio.
 */
@Controller
public class PortfolioController {

    @GetMapping({"/", "/home"})
    public String home() {
        return "index";
    }

    @GetMapping("/about")
    public String about() {
        return "about";
    }

    @GetMapping("/services")
    public String services() {
        return "services";
    }

    @GetMapping("/portfolio")
    public String portfolio() {
        return "portfolio";
    }

    @GetMapping("/testimonials")
    public String testimonials() {
        return "testimonials";
    }

    @GetMapping("/contact")
    public String contact() {
        return "contact";
    }
}
