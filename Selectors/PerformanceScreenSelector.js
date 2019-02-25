import { createSelector } from 'reselect';

export const getCreativeTeamMembers = createSelector(
    (role) => {
        if (!role) return '-';

        var personByRole = []
        role.forEach(person => {
            personByRole.push(person.firstName + " " + person.lastName);
        })
        return _.join(personByRole, ', ');
    }
)