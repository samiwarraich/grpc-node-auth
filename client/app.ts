import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../pb/services";
import customConfig from "../server/config/default";

const options: protoLoader.Options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
const PORT = customConfig.port;
const PROTO_FILE = "../proto/services.proto";
const packageDef = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_FILE),
  options
);

const proto = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;

const client = new proto.auth.AuthService(
  `0.0.0.0:${PORT}`,
  grpc.credentials.createInsecure()
);
const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
client.waitForReady(deadline, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  onClientReady();
});

function onClientReady() {
  // signUpUser();
  // signInUser();
  // refreshToken();
  // getAuthenticatedUser();
  // verifyEmail("15479b538ed8fcdd6e6e1fd0a194dac79f917a3a");
}

function signUpUser() {
  client.SignUpUser(
    {
      name: "Sami Warraich",
      email: "sami@test.c",
      password: "123456",
      passwordConfirm: "123456",
      photo: "default.png",
    },
    (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(res);
    }
  );
}

function signInUser() {
  client.SignInUser(
    {
      email: "sami@test.com",
      password: "123456",
    },
    (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(res);
    }
  );
}

function refreshToken() {
  client.RefreshToken(
    {
      refresh_token: "",
    },
    (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(res);
    }
  );
}

function getAuthenticatedUser() {
  client.getMe(
    {
      access_token: "",
    },
    (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(res);
    }
  );
}

function verifyEmail(verification_code: string) {
  client.verifyEmail({ verification_code }, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(res);
  });
}
