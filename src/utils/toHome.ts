import router from "@/router/index";
export const HomePage = "/dashboard";
export function toHome() {
  router.push(HomePage);
}
