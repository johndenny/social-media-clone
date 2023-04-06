import { useQuery } from "urql";
import { PopularUsers, SuggestedUsers } from "../graphQL/queries";
import { UserListI } from "../types";

interface SuggestedUserQueryToggleI {
  limit: number;
}

interface SuggestedUserQueryToggleReturnI {
  id: number;
  isNextPage: boolean;
  profiles: UserListI;
  isPopular: boolean;
}

export const SuggestedUserQueryToggle = ({
  limit,
}: SuggestedUserQueryToggleI): SuggestedUserQueryToggleReturnI => {
  const isPopular = Math.random() < 0.5;

  const [results] = useQuery({
    query: isPopular ? PopularUsers : SuggestedUsers,
    variables: { limit, skip: 0 },
  });

  return {
    ...results.data[isPopular ? "popularUsers" : "suggestedUsers"],
    isPopular,
  };
};
