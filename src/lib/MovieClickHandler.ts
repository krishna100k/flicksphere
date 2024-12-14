import { ContinueWatchingSchema } from "@/packages/types/continueWatching";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSelector } from "react-redux";

export interface IProps {
    type : string,
    router : AppRouterInstance,
    CWData : ContinueWatchingSchema[]
    data : any
}

    export const movieClickHandler = ({type, router, CWData , data} : IProps) => {
      if (type === "Movies") {
        router.push(`/${data?.id}?category=movie`);
        return;
      } else if (type === "Series") {
        if (CWData.length > 0) {
          const item = CWData.find((item: ContinueWatchingSchema) => data?.id == item?.movieId);
          if (item) {
            router.push(`/${item?.movieId}?category=tv&season=${item?.season}&ep=${item?.episode}`);
          } else {
            router.push(`/${data?.id}?category=tv&season=1&ep=1`);
          }
        } else {
          router.push(`/${data?.id}?category=tv&season=1&ep=1`);
        }
      }
    };