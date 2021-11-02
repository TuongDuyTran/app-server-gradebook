import DBO from 'dbo';
const { getConnect, dbo } = DBO;
const queryInterface = getConnect().getQueryInterface();
export default {
    Up: () => {
        console.log(":::DO MIGRATE");
        return Promise.all([
            
        ]);
    }
};