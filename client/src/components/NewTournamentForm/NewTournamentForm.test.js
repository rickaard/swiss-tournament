import { containsEmptyStrings, containsDuplicate } from './NewTournamentForm';

describe('check for empty strings', () => {
    const objWithEmtpyProp = {
        first: 'not empty',
        second: 'not empty',
        third: '',
        forth: 'not empty'
    };
    const objWithoutEmptyProp = {
        first: 'not empty',
        second: 'not empty',
        third: 'not empty',
    };
    const objWithOnlyWhiteSpaces = {
        first: ' ',
    }
    it('should return true if containts empty strings', () => {
        expect(containsEmptyStrings(objWithEmtpyProp)).toBe(true);
    });
    it('should return true if containts empty strings', () => {
        expect(containsEmptyStrings(objWithOnlyWhiteSpaces)).toBe(true);
    });
    it('should return false if not contains empty strings', () => {
        expect(containsEmptyStrings(objWithoutEmptyProp)).toBe(false);
    })
});

describe('check for duplicate names', () => {
    const objWithoutDuplicate = {
        first: 'Arsenal',
        second: 'Barcelona',
        third: 'Juventus',
    };
    const obWithDuplicate = {
        first: 'Barcelona',
        second: 'Juventus',
        third: 'Barcelona'
    };
    const objWithWhiteSpace = {
        first: 'Barcelona',
        second: ' Barcelona',
        third: 'Arsenal',
        forth: 'Arsenal '
    }
    it('should return true if contains duplicate', () => {
        expect(containsDuplicate(objWithoutDuplicate)).toBe(false);
    });
    it('should return false if NOT contains duplicate', () => {
        expect(containsDuplicate(obWithDuplicate)).toBe(true);
    });
    it('should return true if contains duplicate even tho white space', () => {
        expect(containsDuplicate(objWithWhiteSpace)).toBe(true);
    })
})