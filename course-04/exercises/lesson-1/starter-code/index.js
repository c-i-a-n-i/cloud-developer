const AWS = require("aws-sdk");
const axios = require("axios");

// Name of a service, any string
const serviceName = process.env.SERVICE_NAME;
// URL of a service to test
const url = process.env.URL;

// CloudWatch client
const cloudwatch = new AWS.CloudWatch();

exports.handler = async event => {
  let endTime;
  let requestWasSuccessful = 1;

  const startTime = timeInMs();
  try {
    await axios.get(url);
    endTime = timeInMs();
  } catch (error) {
    requestWasSuccessful = 0;
  }

  await cloudwatch
    .putMetricData({
      MetricData: [
        {
          MetricName: "Latency",
          Dimensions: [
            {
              Name: "ServiceName",
              Value: serviceName
            }
          ],
          Unit: "Milliseconds",
          Value: endTime - startTime
        }
      ],
      Namespace: "Udacity/Serveless"
    })
    .promise();

  await cloudwatch
    .putMetricData({
      MetricData: [
        {
          MetricName: "Successful",
          Dimensions: [
            {
              Name: "ServiceName",
              Value: serviceName
            }
          ],
          Unit: "Count",
          Value: requestWasSuccessful
        }
      ],
      Namespace: "Udacity/Serveless"
    })
    .promise();
};

function timeInMs() {
  return new Date().getTime();
}
