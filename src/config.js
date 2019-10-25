const dev = {
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://k9x4qygzve.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_3OaJX6XiQ",
    APP_CLIENT_ID: "2kui7b6ec1i4mqie4fm0g9dns7",
    IDENTITY_POOL_ID: "us-east-1:cfadeccb-5ef7-4e96-ad33-7c7e43cff612"
  }
};

const prod = {
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://50dq3zti25.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_OBmDuheeu",
    APP_CLIENT_ID: "7s07t93aq45rbdb5ca05tsvuvj",
    IDENTITY_POOL_ID: "us-east-1:6d118341-fe98-4e75-8d6b-150ab2ee60b6"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};