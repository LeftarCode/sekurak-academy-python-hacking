FROM eclipse-temurin:17-jdk-alpine
WORKDIR /tmp

COPY . .

ENTRYPOINT ["java","-Djdk.serialFilter=*","-jar","out/artifacts/DamnVulnerableSpring_jar/DamnVulnerableSpring.jar"]