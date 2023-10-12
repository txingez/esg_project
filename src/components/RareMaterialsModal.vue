<script setup>
import { useModalStore } from "../stores/useModalStore.js";

const modalStore = useModalStore()

const tableData = [
	{number: 1, name: 'Antimony', symbol: 'Sb'},
	{number: 2, name: 'Arsenic', symbol: 'As'},
	{number: 3, name: 'Bauxite', symbol: 'Al&#8322;O&#8323;. 2H&#8322;O'},
	{number: 4, name: 'Baryte', symbol: 'BASO&#8324;'},
	{number: 5, name: 'Beryllium', symbol: 'Be'},
	{number: 6, name: 'Bismuth', symbol: 'Bi'},
	{number: 7, name: 'Boron', symbol: 'B'},
	{number: 8, name: 'Cobalt', symbol: 'Co'},
	{number: 9, name: 'Than cốc', symbol: '-'},
	{number: 10, name: 'Copper', symbol: 'Cu'},
	{number: 11, name: 'Feldspar/Felspat/Đá tràng thạch/Đá bồ tát', symbol: 'KAlSi&#8323;O&#8328;'},
	{number: 12, name: 'Đá Flourite/Huỳnh thạch', symbol: 'CaF&#8322;'},
	{number: 13, name: 'Gallium', symbol: 'Ga'},
	{number: 14, name: 'Germanium', symbol: 'Ge'},
	{number: 15, name: 'Hafnium', symbol: 'Hf'},
	{number: 16, name: 'Helium', symbol: 'He'},
	{number: 17, name: 'Đất hiếm nặng', symbol: '-'},
	{number: 19, name: 'Lithium', symbol: 'Li'},
	{number: 20, name: 'Magnesium', symbol: 'Mg'},
	{number: 21, name: 'Manganese', symbol: 'Mn'},
	{number: 22, name: 'Graphite tự nhiên', symbol: 'KC0&#x2088;'},
	{number: 23, name: 'Nickel', symbol: 'Ni'},
	{number: 24, name: 'Niobium', symbol: 'Nb'},
	{number: 25, name: 'Đá Phosphate', symbol: '-'},
	{number: 26, name: 'Phosphorus', symbol: 'P'},
	{number: 27, name: 'Platinum', symbol: 'Pt'},
	{number: 28, name: 'Scandium', symbol: 'Sc'},
	{number: 29, name: 'Silicon', symbol: 'Si'},
	{number: 30, name: 'Strontium', symbol: 'Sr'},
	{number: 31, name: 'Tantalum', symbol: 'Ta'},
	{number: 32, name: 'Titanium', symbol: 'Ti'},
	{number: 33, name: 'Tungsten', symbol: 'W'},
	{number: 34, name: 'Vanadium', symbol: 'V'}
]
</script>

<template>
    <a-modal v-model:open="modalStore.rareMaterialsOpen"
             :footer="null"
             title="DANH MỤC VẬT LIỆU HIẾM">
        <div class="max-h-[800px] overflow-scroll">
            <table class="table-fixed border-collapse w-full">
                <tr>
                    <th class="border text-center w-[10%]">STT</th>
                    <th class="border text-center">Tên vật liệu</th>
                    <th class="border text-center">Ký hiệu hóa học</th>
                </tr>

                <tr v-for="data in tableData">
                    <td class="border text-center">{{ data.number }}</td>
                    <td class="border px-2">{{ data.name }}</td>
                    <td class="border px-2" v-html="data.symbol"></td>
                </tr>
            </table>
        </div>
    </a-modal>
</template>
