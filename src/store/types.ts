
export interface ProjectProps {
    id: number| string;
    name: string;
    description: string;
    owner: {
        login: string;
    };
    stargazers_count: number;
    watchers_count: number;
}

