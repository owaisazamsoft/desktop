import { defineStore } from 'pinia'
import { useTheme } from 'vuetify';
// import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';

import { saveAs } from 'file-saver';

export const useThemeStore = defineStore('theme', {
    state: () => ({
        menuOpen: true,
        menuType: 'expanded',
        themeMode: 'dark',
        loading: false,
    }),

    getters: {
        // userName: (state) => state.user?.name || 'Guest',
    },

    actions: {
        toggleThemeMode(theme) {
             if (theme.global.name == "adminDark") {
                theme.change("adminLight");
            } else {
                theme.change("adminDark");
            }
        },
        toggleMenuType() {
            this.menuType = this.menuType === 'collapsed' ? 'expanded' : 'collapsed'
        },
        toggleMenu() {
            this.menuOpen = this.menuOpen === true ? false : true;
        },
        setMenuType(type) {
            this.menuType = this.menuType === type;
        },
        startLoading() {
            this.loading = true;
            console.log('Theme Store Loading',this.loading);
        },
        endLoading() {
            this.loading = false;
             console.log('Theme Store Loading',this.loading);
        },
        toggleTheme() {
            if (this.vuetify.global.name == "adminDark") {
                this.vuetify.change("adminLight");
            } else {
                this.vuetify.change("adminDark");
            }
        },

        toggleTheme() {
            if (this.vuetify.global.name == "adminDark") {
                this.vuetify.change("adminLight");
            } else {
                this.vuetify.change("adminDark");
            }
        },
        exportToExcel(name,sheet) {


            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet(name);

            // Add headers
            const headers = Object.keys(sheet[0] || {}).map(h =>  String(h).toUpperCase().replace(/_/g, ' ')  );
            worksheet.addRow(headers);

            // Style header row
            const headerRow = worksheet.getRow(1);
            headerRow.font = { bold: true };
            headerRow.alignment = { horizontal: 'center' };
            headerRow.eachCell(cell => { cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFCCCCCC' } }; });

            // Add data rows
            sheet.forEach(item => {
                worksheet.addRow(Object.values(item));
            });

            // Set column widths
            worksheet.columns.forEach(col => { col.width = 20; });

            // Export
            workbook.xlsx.writeBuffer().then(buffer => {
                saveAs(new Blob([buffer], 
                    { 
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
                    }), `${name}.xlsx`)});
                }


            },


})
