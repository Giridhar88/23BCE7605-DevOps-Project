# PixelForge Studio - Portfolio Website

A modern, responsive portfolio website for a fictional web design and development company, built with Spring Boot 3, Java 21, and Thymeleaf.

## Technology Stack

- Java 21
- Spring Boot 3.3.1
- Thymeleaf template engine
- Vanilla CSS3 and JavaScript (no frameworks)
- Maven build system
- Docker (multi-stage build)

## Project Structure

```
src/
  main/
    java/com/pixelforge/studio/
      PortfolioApplication.java        # Application entry point
      controller/
        PortfolioController.java       # MVC controller for all page routes
    resources/
      application.properties           # Server and template configuration
      templates/
        layout.html                    # Base layout with header and footer fragments
        index.html                     # Home page
        about.html                     # About page (team, timeline, skills)
        services.html                  # Services and pricing page
        portfolio.html                 # Project showcase with category filters
        testimonials.html              # Client reviews, FAQ, and blog previews
        contact.html                   # Contact form, details, and map
      static/
        css/styles.css                 # Global stylesheet (dark theme, glassmorphism)
        js/main.js                     # Client-side interactivity and animations
Dockerfile                             # Multi-stage container build
```

## Architecture

The application follows the standard Spring MVC pattern:

1. A single `PortfolioController` maps GET requests to Thymeleaf template names.
2. `layout.html` provides reusable header and footer fragments consumed by all pages via Thymeleaf fragment expressions.
3. Static assets (CSS, JS) are served from `src/main/resources/static/` by Spring Boot's default resource handler.
4. No database is used; all content is embedded directly in the templates.

### Routes

| Path            | Template           | Description                        |
|-----------------|--------------------|------------------------------------|
| `/`             | index.html         | Home with hero, stats, previews    |
| `/about`        | about.html         | Team profiles, milestones, skills  |
| `/services`     | services.html      | Service cards, pricing plans       |
| `/portfolio`    | portfolio.html     | Projects grid with JS filtering    |
| `/testimonials` | testimonials.html  | Reviews, FAQ accordion, blog       |
| `/contact`      | contact.html       | Contact form, map, social links    |

## Running Locally

```bash
mvn spring-boot:run
```

The application starts on `http://localhost:8080`.

## Building the Docker Image

```bash
docker build -t pixelforge-studio .
docker run -p 8080:8080 pixelforge-studio
```
