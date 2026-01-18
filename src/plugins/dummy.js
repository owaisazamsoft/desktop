import department from "@/enums/department";
import group from "@/enums/group";
import role from "@/enums/role";
import category from "@/enums/category";
import { faker } from "@faker-js/faker";
import _ from "lodash";





const departments = async (count) => {

    const data = Array.from({ length: count }, (v,i) => {
        return {
            id: i + 1,
            name:faker.commerce.department(),
        };
    });
    
    localStorage.setItem('departments',JSON.stringify(data))

    return 'Departments Added';

}


const products = async (count) => {

    const data = Array.from({ length: count }, (v,i) => {
        return {
            id: i + 1,
            code: faker.string.numeric(4),
            category:_.sample(category , 1),
            name: faker.commerce.product(),
            rate: faker.commerce.price(),
        };
    });
    
    localStorage.setItem('products',JSON.stringify(data))

    return 'products Added';

}



const lots = async (count) => {

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let userIds = users.map(user => user.id);

    const data = Array.from({ length: count }, (v,i) => {

        const fabricTypes = ["Cotton", "Polyester", "Silk"];
        const colors = ["Red", "Blue", "Black", "White", "Green"];
        const sizes = ["S","M","L","XL","XXL"];
        const randomDate = faker.date.past({ years: 5 });
        
        return {
            id: i + 1,
            fabricType: _.sample(fabricTypes),
            color: _.sample(colors),
            quantity: _.random(100, 2000),  // pieces or meters
            size: _.sample(sizes),
            startDate: randomDate.toISOString(),
            userId: _.sample(userIds, 1)
        };

    });
    
    localStorage.setItem('lots',JSON.stringify(data))
    
    return 'Lots Added';

}


  const users = async (count) => {
   
        // let departments = JSON.parse(localStorage.getItem('departments') || '[]');
        // let departmentIds = departments.map(department => department.id);

        const data = Array.from({ length: count }, (v,i) => {

            let gender = faker.person.sex();
            const randomCount = _.random(1, role.length);
            

            return {
                id:  i+1,
                name: faker.person.fullName({sex:gender}),
                email: faker.internet.email(),
                date_of_birth:faker.date.birthdate({ min: 18, max: 60, mode: 'age' }),
                gender:gender,
                department:_.sample(department,1),
                type:  _.sampleSize(group,randomCount),
                roles:  _.sampleSize(role,randomCount),
                address:faker.location.streetAddress(),
            };

        });
        
        localStorage.setItem('users',JSON.stringify(data))
        
        return 'User Added';
}



const stitching = async (count) => {

        let users = JSON.parse(localStorage.getItem('users') || '[]');
        let userIds = users.map(user => user.id);

        let lots = JSON.parse(localStorage.getItem('lots') || '[]');
        let lotId = lots.map(lot => lot.id);

        let products = JSON.parse(localStorage.getItem('products') || '[]');
        let productId = products.map(product => product.id);
       

        const data = Array.from({ length: count }, (v,i) => {
            const randomDate = faker.date.past({ years: 5 });
            let rate = faker.number.int({ min: 10, max: 50});
            const quantity = faker.number.int({ min: 1, max: 300});

            return {
                id: i + 1,
                department: _.sample(department,1),
                product: _.sample(productId,1),
                lot: _.sample(lotId,1),
                user:_.sample(userIds,1),
                date: randomDate.toISOString(),
                qty:quantity,
                rate:rate,
                total: quantity * rate,
            };

        });
        

        localStorage.setItem('stitching',JSON.stringify(data))
        
        return 'Stitching Added';
}



const payments = async (count) => {

        let users = JSON.parse(localStorage.getItem('users') || '[]');
        let userIds = users.map(user => user.id);
       
         

        const data = Array.from({ length: count }, (v,i) => {
             const randomDate = faker.date.past({ years: 5 });
             const amount = faker.number.int({ min: 1, max: 300});
            return {
                id: i + 1,
                department: _.sample(department,1),
                user:_.sample(userIds,1),
                date: randomDate.toISOString(),
                description:"Payment",
                debit: amount,
                credit: 0,               
            };
        });

        console.log(data);
        
        
        
        localStorage.setItem('payments',JSON.stringify(data))
        return 'Payments Added';

}



const start = async () => {

    

    if (!localStorage.getItem("departments")) {
        let res = await departments(10);
        // return Promise.resolve("already exists");
    }

    if (!localStorage.getItem("users")) {
        let res = await users(500);
        // return Promise.resolve("already exists");
    }

    if (!localStorage.getItem("lots")) {
        let res = await lots(100);
            // return Promise.resolve("already exists"); 
    }

    if (!localStorage.getItem("products")) {
        let res = await products(1000);
            // return Promise.resolve("already exists"); 
    }

    if (!localStorage.getItem("stitching")) {
        let res = await stitching(500);
            // return Promise.resolve("already exists"); 
    }


    if (!localStorage.getItem("payments")) {
        let res = await payments(500);
            // return Promise.resolve("already exists"); 
    }

    



    // console.log(res);    
    return 'Operation Complete';

}




export default start