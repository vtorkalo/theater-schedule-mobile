import { createSelector } from 'reselect'
import _ from 'lodash';

const groupingSelector = creativeTeamMembers => _.groupBy(creativeTeamMembers, teamMembers => teamMembers.roleKey);

const authorsSelector = createSelector(
    groupingSelector,
    (roles) => roles['Author']
)

const producersSelector = createSelector(
    groupingSelector,
    (roles) => roles['Producer']
)

const composersSelector = createSelector(
    groupingSelector,
    (roles) => roles['Composer']
)

const paintersSelector = createSelector(
    groupingSelector,
    (roles) => roles['Painter']
)

export const getTeamMembers = createSelector(
    authorsSelector,
    producersSelector,
    composersSelector,
    paintersSelector,
    (authors, producers, composers, painters) => {

        const getCreativeTeamMembers = (role) => {
            if (!role) return '-';

            var personByRole = role.map((person) => {
                return person.firstName + " " + person.lastName;
            });
            return _.join(personByRole, ', ');
        };
        var Authors = getCreativeTeamMembers(authors);
        var Producers = getCreativeTeamMembers(producers);
        var Composers = getCreativeTeamMembers(composers);
        var Painters = getCreativeTeamMembers(painters);

        return { Authors, Composers, Producers, Painters };
    }
);
