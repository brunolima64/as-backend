import { Prisma, PrismaClient } from "@prisma/client";
import * as people from './people';
import * as groups from './groups';
import { encryptMatch } from "../utils/match";

const prisma = new PrismaClient();

export const getAll = async () => {
    try {
        return prisma.event.findMany();
    } catch (error) { return false }
}

export const getOne = async (id: number) => {
    try {
        return await prisma.event.findFirst({ where: { id } })
    } catch (error) { return false }
}

export const add = async (data: Prisma.EventCreateInput) => {
    try {
        return await prisma.event.create({ data });
    } catch (error) { return false }
}

export const update = async (id: number, data: Prisma.EventUpdateInput) => {
    try {
        return await prisma.event.update({
            where: { id },
            data
        })
    } catch (error) { return false }
}

export const remove = async (id: number) => {
    try {
        return await prisma.event.delete({ where: { id } });
    } catch (error) { return false }
}

export const doMatches = async (id: number): Promise<boolean> => {
    const eventItem = await prisma.event.findFirst({ where: { id }, select: { grouped: true } })

    if (eventItem) {
        const peopleList = await people.getAll({ id_event: id });
        if (peopleList) {
            let sortedList: { id: number, match: number }[] = [];
            let sortable: number[] = [];

            let attemps = 0;
            let maxAttemps = peopleList.length;
            let keepTrying = true;
            while (keepTrying && attemps < maxAttemps) {
                keepTrying = false;
                attemps++;
                sortedList = [];
                sortable = peopleList.map(item => item.id);

                for (let i in peopleList) {
                    let sortableFiltered: number[] = sortable;
                    if (eventItem.grouped) {
                        sortableFiltered = sortable.filter(sortableItem => {
                            let sortablePerson = peopleList.find(item => item.id === sortableItem);
                            return peopleList[i].id_group !== sortablePerson?.id_group;
                        });
                    }

                    if (sortableFiltered.length === 0 || (sortableFiltered.length === 1 && peopleList[i].id === sortableFiltered[0])) {
                        keepTrying = true;
                    } else {
                        let sortedIndex = Math.floor(Math.random() * sortableFiltered.length);
                        while (sortableFiltered[sortedIndex] === peopleList[i].id) {
                            sortedIndex = Math.floor(Math.random() * sortableFiltered.length);
                        }

                        sortedList.push({
                            id: peopleList[i].id,
                            match: sortableFiltered[sortedIndex]
                        });
                        sortable = sortable.filter(item => item !== sortableFiltered[sortedIndex]);
                    }

                }
            }

            console.log(`ATTEMPS: ${attemps}`);
            console.log(`MAX ATTEMPS: ${maxAttemps}`);
            console.log(sortedList);


            if (attemps < maxAttemps) {
                for (let i in sortedList) {
                    await people.update({
                        id: sortedList[i].id,
                        id_event: id
                    }, { matched: encryptMatch(sortedList[i].match) });
                }
                return true;
            }

        }
    }

    return false;
}