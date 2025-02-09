import { Prisma, PrismaClient } from "@prisma/client";
import * as groups from './groups';

const prisma = new PrismaClient();

type GetAllFilters = { id_event: number; id_group?: number }
export const getAll = async (filters: GetAllFilters) => {
    try {
        return await prisma.eventPeople.findMany({ where: filters })
    } catch (error) {
        return false;
    }
}

type GetOneFilter = { id_event: number; id_group?: number; id?: number; cpf?: string }
export const geOne = async (filters: GetOneFilter) => {
    try {
        if (!filters.id && !filters.cpf) return false;
        return await prisma.eventPeople.findFirst({ where: filters })
    } catch (error) {
        return false;
    }
}

type PeopleCreateData = Prisma.Args<typeof prisma.eventPeople, "create">["data"];
export const add = async (data: PeopleCreateData) => {
    try {
        if (!data.id_group) return false;

        const group = await groups.getOne(data.id_group, data.id_event);
        if (!group) return false;

        return await prisma.eventPeople.create({ data });
    } catch (error) { return false }
}

type PeopleUpdateData = Prisma.Args<typeof prisma.eventPeople, "update">["data"];
type UpdateFilters = { id?: number; id_event: number; id_group?: number; }
export const update = async (filters: UpdateFilters, data: PeopleUpdateData) => {
    try {
        return await prisma.eventPeople.updateMany({ where: filters, data });
    } catch (error) { return false }
}

type deleteFilters = { id: number; id_event: number; id_group?: number; }
export const remove = async (filters: deleteFilters) => {
    try {
        return await prisma.eventPeople.delete({ where: filters })
    } catch (error) { return false }
}