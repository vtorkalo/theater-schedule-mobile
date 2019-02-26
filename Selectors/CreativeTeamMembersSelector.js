import { createSelector } from 'reselect'
import _ from 'lodash';

const authorsSelector = roles => roles['Author']
const producersSelector = roles => roles['Producer'];
const composersSelector = roles => roles['Composer'];
const paintersSelector = roles => roles['Painter'];

export const getComposers = createSelector(
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
