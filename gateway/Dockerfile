FROM gradle:7.2.0-jdk17 as build

WORKDIR /app

COPY ./ ./

RUN ./gradlew assemble

RUN ls -R

FROM openjdk:17

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]