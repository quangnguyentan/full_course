import { useQuery } from "@tanstack/react-query";
import instance from "@/axios";
import { AxiosError } from "axios";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      try {
        const res = await instance.get("/auth/verify-token");
        console.log(res);
        return res.data;
      } catch (err: unknown) {
        // Nếu accessToken hết hạn, gọi refresh
        if (err instanceof AxiosError && err.response?.status === 401) {
          try {
            const refreshRes = await instance.post("/auth/refresh-token");
            if (refreshRes?.data?.newAccessToken) {
              // Gọi lại verify-token sau khi có accessToken mới
              const retryRes = await instance.get("/auth/verify-token");
              return retryRes.data;
            }
          } catch (refreshErr) {
            throw refreshErr;
          }
        }

        // Nếu không phải lỗi 401 hoặc refresh cũng fail thì throw luôn
        throw err;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
