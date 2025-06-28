export default class ENV {
    public static ENV_NAME = process.env.ENV_NAME;
    public static ROOT_URL = process.env.BASE_URL;
    public static BASE_URL = `${process.env.BASE_URL}`;
    public static TEST_TIMEOUT = process.env.TEST_TIMEOUT;
  }