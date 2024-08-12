import { Prisma, PrismaClient } from "@prisma/client";
import * as events from './events'

const prisma = new PrismaClient();

export const getAll = async (id_event: number) => {
    try {
        return prisma.eventGroup.findMany({ where: { id_event } });
    } catch (error) { return false }
}

export const getOne = async (id: number, id_event?: number) => {
    try {
        return await prisma.eventGroup.findFirst({ where: { id_event, id } })
    } catch (error) { return false }
}

type EventGroupCreateInput = Prisma.Args<typeof prisma.eventGroup, "create">['data'];
export const add = async (data: EventGroupCreateInput) => {
    try {
        if (!data.id_event) return false;

        const eventItem = await events.getOne(data.id_event);
        if (!eventItem) return false;

        return await prisma.eventGroup.create({ data });
    } catch (error) { return false }
}

type UpdateFilters = { id: number; id_event: number; }
type GroupsUpdateData = Prisma.Args<typeof prisma.eventGroup, "update">['data'];
export const update = async (filters: UpdateFilters, data: GroupsUpdateData) => {
    try {
        return await prisma.eventGroup.update({ where: filters, data })
    } catch (error) {
        return false
    }
}

type deleteFilters = { id: number; id_event?: number; }
export const remove = async (filters: deleteFilters) => {
    try {
        return await prisma.eventGroup.delete({ where: filters })
    } catch (error) {

    }
}