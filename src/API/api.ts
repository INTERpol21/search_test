import {ProjectProps} from "../store/types.ts";
import axios from "axios";



export async function searchRepositories(searchTerm: string): Promise<ProjectProps[]> {
    const response = await axios.get(`https://api.github.com/search/repositories?q=${searchTerm}`);
    console.log(response)

    return response.data.items.map((item: ProjectProps) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        owner: { login: item.owner.login },
        stargazers_count: item.stargazers_count,
        watchers_count: item.watchers_count
    })) as ProjectProps[];
}
