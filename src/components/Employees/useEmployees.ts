import { useEffect, useState } from 'react';
import { Employee, getData } from '../../services/api';
type Response = {
    employees?: Employee[],
}

export function useEmployees(): Response {
    const [data, setData] = useState<Employee[]>()

    const getEmployees = async () => {
        const employees = await getData();
        setData(employees);
    }
    
    useEffect(() => {
        getEmployees();
    }, []);

    return {
        employees: data,
     };
}