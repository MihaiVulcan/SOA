package com.example.restservice.lambda;

import com.fasterxml.jackson.core.JsonParser;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.services.lambda.LambdaClient;
import software.amazon.awssdk.services.lambda.model.InvokeRequest;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.services.lambda.model.InvokeResponse;
import software.amazon.awssdk.services.lambda.model.LambdaException;

@NoArgsConstructor
@Component
@Log4j2
public class LambdaInvoke {
    public String invokeFunction(LambdaClient awsLambda, String functionName, JSONObject input) {
        InvokeResponse res = null;
        try {
            String json = input.toString();
            SdkBytes payload = SdkBytes.fromUtf8String(json);

            // Setup an InvokeRequest.
            InvokeRequest request = InvokeRequest.builder()
                    .functionName(functionName)
                    .payload(payload)
                    .build();

            res = awsLambda.invoke(request);
            String value = res.payload().asUtf8String();
            return value;
        } catch (LambdaException e) {
            System.err.println(e.getMessage());
        }
        return null;
    }
}
