// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  myurl:"http://localhost:4200/",
  error:"http://localhost:4200/error",
  apiserver:"http://localhost:3000/",
  //apiserver:"http://ec2-35-176-96-88.eu-west-2.compute.amazonaws.com:3000/"
};
