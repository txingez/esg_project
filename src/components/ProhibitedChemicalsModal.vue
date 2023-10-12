<script setup>
import { useModalStore } from "../stores/useModalStore.js";

const modalStore = useModalStore()
</script>

<template>
    <a-modal v-model:open="modalStore.prohibitedChemicalsOpen"
             :footer="null"
             title="DANH MỤC HÓA CHẤT CẤM"
             width="100%">
        <div class="italic md:text-sm text-[10px]">
            (Kèm theo Nghị định số 113/2017/NĐ-CP ngày 09 tháng 10 năm 2017 của Chính phủ)
        </div>
        <div class="max-h-[800px] overflow-scroll">
            <table class="table-fixed border-collapse w-full md:text-sm text-[10px]">
                <thead>
                <tr>
                    <th class="border text-center w-[5%]">STT</th>
                    <th class="border text-center">Tên hóa chất theo tiếng Việt</th>
                    <th class="border text-center">Tên hóa chất theo tiếng Anh</th>
                    <th class="border text-center w-[15%]">Mã HS(1)</th>
                    <th class="border text-center w-[16%]">Mã số CAS</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td class="border text-center align-top" rowspan="4">1</td>
                    <td class="border-r px-2 align-top">
                        Các hợp chất O-Alkyl (&lt;C10, gồm cả cycloalkyl) alkyl (Me, Et, n-Pr hoặc i-Pr)-
                        phosphonofloridat
                    </td>
                    <td class="border-r px-2 align-top">
                        O-Alkyl (&lt;=C10, incl. cycloalkyl) alkyl (Me, Et, n- Pr or i-Pr)- phosphonofluoridates
                    </td>
                    <td class="border-r px-2 text-right">
                        2931
                    </td>
                    <td class="border-r"/>
                </tr>
                <tr>
                    <td class="border-r px-2 align-top">
                        Ví dụ:
                    </td>
                    <td class="border-r px-2 align-top">
                        Example:
                    </td>
                    <td class="border-r"/>
                    <td class="border-r"/>
                </tr>
                <tr>
                    <td class="border-r px-2 align-top">
                        • Sarin: O-Isopropylmetyl phosphonofloridat
                    </td>
                    <td class="border-r px-2 align-top">
                        • Sarin: O-Isopropyl methylphosphonofluorid ate
                    </td>
                    <td class="border-r px-2 text-right">2931.908</td>
                    <td class="border-r px-2 text-right">107-44-8</td>
                </tr>
                <tr>
                    <td class="border-r border-b px-2 align-top">
                        • Soman: O-Pinacolyl metylphosphonofloridat
                    </td>
                    <td class="border-r border-b px-2 align-top">
                        • Soman: O-Pinacolyl metylphosphonofloridat
                    </td>
                    <td class="border-r border-b px-2 text-right">2931.908</td>
                    <td class="border-r border-b px-2 text-right">96-64-0</td>
                </tr>

                <tr>
                    <td class="border text-center align-top" rowspan="3">2</td>
                    <td class="border-r px-2 align-top">
                        Các hợp chất O-Alkyl (&lt;C10, gồm cả cycloalkyl) N,N-dialkyl(Me, Et, n-Pr hoặc i-Pr)-
                        phosphoramidocyanidat
                    </td>
                    <td class="border-r px-2 align-top">
                        O-Alkyl (&lt;=C10, incl. cycloalkyl) N,N-dialkyl (Me, Et, n-Pr or i-Pr) phosphoramidocyanidates
                    </td>
                    <td class="border-r px-2 text-right">
                        2931
                    </td>
                    <td class="border-r"/>
                </tr>
                <tr>
                    <td class="border-r px-2 align-top">
                        Ví dụ:
                    </td>
                    <td class="border-r px-2 align-top">
                        Example:
                    </td>
                    <td class="border-r"/>
                    <td class="border-r"/>
                </tr>
                <tr>
                    <td class="border-r border-b px-2 align-top">
                        Tabun:O-Ethyl N,N-dimetyl phosphoramidocyanidat
                    </td>
                    <td class="border-r border-b px-2 align-top">
                        Tabun:O-Ethyl N,N- dimethyl phosphoramidocyanidate
                    </td>
                    <td class="border-r border-b px-2 text-right">2931.908</td>
                    <td class="border-r border-b px-2 text-right">77-81-6</td>
                </tr>

                <tr>
                    <td class="border text-center align-top" rowspan="3">3</td>
                    <td class="border-r px-2 align-top">
                        Các hợp chất O-Alkyl (H hoặc&lt;C10, gồm cả cycloalkyl) S-2- dialkyl (Me, Et, n-Pr hoặc i-Pr)-
                        aminoetyl alkyl (Me, Et, n-Pr hoặc i-Pr) phosphonothiolat và các muối alkyl hóa hoặc proton hóa
                        tương ứng
                    </td>
                    <td class="border-r px-2 align-top">
                        O-Alkyl (H or &lt;=C10, incl. cycloalkyl) S-2-dialkyl (Me, Et, n-Pr or i-Pr)-aminoethyl alkyl
                        (Me,
                        Et, n-Pr or i-Pr) phosphonothiolates and corresponding alkylated or protonated salts
                    </td>
                    <td class="border-r px-2 text-right">
                        2930.9
                    </td>
                    <td class="border-r"/>
                </tr>
                <tr>
                    <td class="border-r px-2 align-top">
                        Ví dụ:
                    </td>
                    <td class="border-r px-2 align-top">
                        Example:
                    </td>
                    <td class="border-r"/>
                    <td class="border-r"/>
                </tr>
                <tr>
                    <td class="border-r border-b px-2 align-top">
                        O-Etyl S-2- diisopropylaminoetyl metyl phosphonothiolat
                    </td>
                    <td class="border-r border-b px-2 align-top">
                        O-Ethyl S-2- diisopropylaminoethyl methyl phosphonothiolate
                    </td>
                    <td class="border-r border-b px-2 text-right">2930.9099</td>
                    <td class="border-r border-b px-2 text-right">50782-69-9</td>
                </tr>

                <tr>
                    <td class="border text-center align-top" rowspan="10">4</td>
                    <td class="border-r px-2 align-top">
                        Các chất khí gây bỏng chứa Lưu huỳnh:
                    </td>
                    <td class="border-r px-2 align-top">
                        Sulfur mustards:
                    </td>
                    <td class="border-r">
                    </td>
                    <td class="border-r"/>
                </tr>
                <tr>
                    <td class="border-r px-2 align-top">
                        • 2- Cloroetylchlorometylsulfit
                    </td>
                    <td class="border-r px-2 align-top">
                        • 2-Chloroethyl chloromethylsulfide
                    </td>
                    <td class="border-r px-2 text-right">2930.9099</td>
                    <td class="border-r px-2 text-right">2625-76-5</td>
                </tr>
                <tr>
                    <td class="border-r px-2 align-top">
                        • Khí gây bỏng: Bis (2- cloroetyl) sulfit
                    </td>
                    <td class="border-r px-2 align-top">
                        • Mustard gas: Bis(2- chloroethyl) sulfide
                    </td>
                    <td class="border-r px-2 text-right">2930.9099</td>
                    <td class="border-r px-2 text-right">505-60-2</td>
                </tr>
                <tr>
                    <td class="border-r px-2 align-top">
                        • Bis (2-cloroetylthio) metan
                    </td>
                    <td class="border-r px-2 align-top">
                        • Bis(2- chloroethylthio) methane
                    </td>
                    <td class="border-r px-2 text-right">2930.9099</td>
                    <td class="border-r px-2 text-right">63869-13-6</td>
                </tr>
                <tr>
                    <td class="border-r px-2 align-top">
                        • Sesquimustard: 1,2-Bis (2- cloroetylthio) etan
                    </td>
                    <td class="border-r px-2 align-top">
                        • Sesquimustard: 1,2- Bis(2- chloroethylthio)ethane
                    </td>
                    <td class="border-r px-2 text-right">2930.9099</td>
                    <td class="border-r px-2 text-right">3563-36-8</td>
                </tr>
                <tr>
                    <td class="border-r px-2 align-top">
                        • 1,3-Bis (2-cloroetylthio) -n-propan
                    </td>
                    <td class="border-r px-2 align-top">
                        • 1,3-Bis(2-chloroethylthio)-n-propane
                    </td>
                    <td class="border-r px-2 text-right">2930.9099</td>
                    <td class="border-r px-2 text-right">63905-10-2</td>
                </tr>
                <tr>
                    <td class="border-r px-2 align-top">
                        • 1,4-Bis (2-cloroetylthio) -n-butan
                    </td>
                    <td class="border-r px-2 align-top">
                        • 1,4-Bis(2- chloroethylthio)-n-butane
                    </td>
                    <td class="border-r px-2 text-right">2930.9099</td>
                    <td class="border-r px-2 text-right">142868-93-7</td>
                </tr>
                <tr>
                    <td class="border-r px-2 align-top">
                        • 1,5-Bis (2-cloroetylthio) -n-pentan
                    </td>
                    <td class="border-r px-2 align-top">
                        • 1,5-Bis(2-chloroethylthio)-n-pentane
                    </td>
                    <td class="border-r px-2 text-right">2930.9099</td>
                    <td class="border-r px-2 text-right">142868-94-8</td>
                </tr>
                <tr>
                    <td class="border-r px-2 align-top">
                        • Bis (2-cloroetylthiometyl) ete
                    </td>
                    <td class="border-r border-b px-2 align-top">
                        • Bis(2- chloroethylthiomethyl)ether
                    </td>
                    <td class="border-r px-2 text-right">2930.9099</td>
                    <td class="border-r px-2 text-right">63918-90-1</td>
                </tr>
                <tr>
                    <td class="border-r border-b px-2 align-top">
                        • Khí gây bỏng chứa Lưu huỳnh và Oxy: Bis (2-cloroetylthioetyl) ete
                    </td>
                    <td class="border-r border-b px-2 align-top">
                        • O-Mustard: Bis(2-chloroethylthioethyl) ether
                    </td>
                    <td class="border-r border-b px-2 text-right">2930.9099</td>
                    <td class="border-r border-b px-2 text-right">63918-89-8</td>
                </tr>

                <tr>
                    <td class="border text-center align-top" rowspan="4">5</td>
                    <td class="border-r px-2 align-top">
                        Các hợp chất Lewisit:
                    </td>
                    <td class="border-r px-2 align-top">
                        Lewisites:
                    </td>
                    <td class="border-r">
                    </td>
                    <td class="border-r"/>
                </tr>
                <tr>
                    <td class="border-r px-2 align-top">
                        • Lewisit 1: 2- Clorovinyldicloroarsin
                    </td>
                    <td class="border-r border-b px-2 align-top">
                        • Lewisite 1: 2- Chlorovinyldichloroarsine
                    </td>
                    <td class="border-r px-2 text-right">2931.908</td>
                    <td class="border-r px-2 text-right">541-25-3</td>
                </tr>
                <tr>
                    <td class="border-r px-2 align-top">
                        • Lewisit 2: Bis (2- chlorovinyl) cloroarsin
                    </td>
                    <td class="border-r border-b px-2 align-top">
                        • Lewisite 2: Bis(2- chlorovinyl)chloroarsine
                    </td>
                    <td class="border-r px-2 text-right">2931.908</td>
                    <td class="border-r px-2 text-right">40334-69-8</td>
                </tr>
                <tr>
                    <td class="border-r border-b px-2 align-top">
                        • Lewisit 3: Tris (2- chlorovinyl) arsin
                    </td>
                    <td class="border-r border-b px-2 align-top">
                        • Lewisite 3: Tris(2- chlorovinyl)arsine
                    </td>
                    <td class="border-r border-b px-2 text-right">2931.908</td>
                    <td class="border-r border-b px-2 text-right">40334-70-1</td>
                </tr>

                <tr>
                    <td class="border text-center align-top" rowspan="4">6</td>
                    <td class="border-r px-2 align-top">
                        Hơi cay Nitơ:
                    </td>
                    <td class="border-r px-2 align-top">
                        Nitrogen mustards:
                    </td>
                    <td class="border-r">
                    </td>
                    <td class="border-r"/>
                </tr>
                <tr>
                    <td class="border-r px-2 align-top">
                        • HN1: Bis (2-chloroethyl) etylamin
                    </td>
                    <td class="border-r border-b px-2 align-top">
                        • HN1: Bis(2- chloroethyl)ethylamine
                    </td>
                    <td class="border-r px-2 text-right">2921.1999</td>
                    <td class="border-r px-2 text-right">538-07-8</td>
                </tr>
                <tr>
                    <td class="border-r px-2 align-top">
                        • HN2: Bis(2- chloroetyl) metylamin
                    </td>
                    <td class="border-r border-b px-2 align-top">
                        • HN2: Bis(2- chloroethyl) methylamine
                    </td>
                    <td class="border-r px-2 text-right">2921.1999</td>
                    <td class="border-r px-2 text-right">51-75-2</td>
                </tr>
                <tr>
                    <td class="border-r border-b px-2 align-top">
                        • HN3: Tris(2-cloroetyl)amin
                    </td>
                    <td class="border-r border-b px-2 align-top">
                        • HN3: Tris(2- chloroethyl)amine
                    </td>
                    <td class="border-r border-b px-2 text-right">2921.1999</td>
                    <td class="border-r border-b px-2 text-right">555-77-1</td>
                </tr>

                <tr>
                    <td class="border text-center align-top">7</td>
                    <td class="border px-2 align-top">
                        Saxitoxin
                    </td>
                    <td class="border px-2 align-top">
                        Saxitoxin
                    </td>
                    <td class="border px-2 text-right">3002.9</td>
                    <td class="border px-2 text-right">35523-89-8</td>
                </tr>

                <tr>
                    <td class="border text-center align-top">8</td>
                    <td class="border px-2 align-top">
                        Ricin
                    </td>
                    <td class="border px-2 align-top">
                        Ricin
                    </td>
                    <td class="border px-2 text-right">3002.9</td>
                    <td class="border px-2 text-right">9009-86-3</td>
                </tr>

                <tr>
                    <td class="border text-center align-top" rowspan="3">9</td>
                    <td class="border-r px-2 align-top">
                        Các hợp chất Alkyl (Me, Et, n- Pr or i-Pr) phosphonyldiflorit
                    </td>
                    <td class="border-r px-2 align-top">
                        Alkyl (Me, Et, n-Pr or i-Pr) phosphonyldifluorides
                    </td>
                    <td class="border-r"/>
                    <td class="border-r"/>
                </tr>
                <tr>
                    <td class="border-r px-2 align-top">
                        Ví dụ:
                    </td>
                    <td class="border-r px-2 align-top">
                        Example:
                    </td>
                    <td class="border-r px-2 text-right"/>
                    <td class="border-r px-2 text-right"/>
                </tr>
                <tr>
                    <td class="border-r border-b px-2 align-top">
                        DF: Metylphosphonyldiflorit
                    </td>
                    <td class="border-r border-b px-2 align-top">
                        DF: Methylphosphonyldifluoride
                    </td>
                    <td class="border-r border-b px-2 text-right">2931.902</td>
                    <td class="border-r border-b px-2 text-right">676-99-3</td>
                </tr>

                <tr>
                    <td class="border text-center align-top" rowspan="3">10</td>
                    <td class="border-r px-2 align-top">
                        Các hợp chất O-Alkyl (H hoặc&lt;C10, gồm cả cycloalkyl) O-2- dialkyl(Me, Et, n-Pr hoặc i-Pr)-
                        aminoetyl alkyl(Me, Et, n-Pr hoặc i-Pr) phosphonit và các muối alkyl hóa hoặc proton hóa tương
                        ứng
                    </td>
                    <td class="border-r px-2">
                        O-Alkyl (H or &lt;=C10, incl. cycloalkyl) O-2-dalkyl (Me, Et, n-Pr or i-Pr)-aminoethyl alkyl
                        (Me,
                        Et, n-Pr or i-Pr) phosphonites and corresponding alkylated or protonated salts
                    </td>
                    <td class="border-r px-2 text-right">2931</td>
                    <td class="border-r"/>
                </tr>
                <tr>
                    <td class="border-r px-2 align-top">
                        Ví dụ:
                    </td>
                    <td class="border-r px-2 align-top">
                        Example:
                    </td>
                    <td class="border-r px-2 text-right"/>
                    <td class="border-r px-2 text-right"/>
                </tr>
                <tr>
                    <td class="border-r border-b px-2 align-top">
                        QL: O-Ethyl O-2- diisopropylaminoetyl metylphosphonit
                    </td>
                    <td class="border-r border-b px-2 align-top">
                        QL: O-Ethyl O-2- diisopropylaminoethyl methylphosphonite
                    </td>
                    <td class="border-r border-b px-2 text-right">2931.908</td>
                    <td class="border-r border-b px-2 text-right">57856-11-8</td>
                </tr>

                <tr>
                    <td class="border text-center align-top">11</td>
                    <td class="border px-2 align-top">
                        Chlorosarin: O-Isopropyl metylphosphonocloridat
                    </td>
                    <td class="border px-2 align-top">
                        Chlorosarin: O-Isopropyl methylphosphonochloridate
                    </td>
                    <td class="border px-2 text-right">2931.908</td>
                    <td class="border px-2 text-right">1445-76-7</td>
                </tr>

                <tr>
                    <td class="border text-center align-top">12</td>
                    <td class="border px-2 align-top">
                        Chlorosoman: O-Pinacolyl metylphosphonocloridat
                    </td>
                    <td class="border px-2 align-top">
                        Chlorosoman: O-Pinacolyl methylphosphonochloridate
                    </td>
                    <td class="border px-2 text-right">2931.908</td>
                    <td class="border px-2 text-right">7040-57-5</td>
                </tr>

                <tr>
                    <td class="border text-center align-top">13</td>
                    <td class="border px-2 align-top">
                        Axit dodecyl benzen sunfonic (DBSA)
                    </td>
                    <td class="border px-2 align-top">
                        Dodecyl benzene sulfonic acid (DBSA)
                    </td>
                    <td class="border px-2 text-right">29041000</td>
                    <td class="border px-2 text-right">27176-87-0</td>
                </tr>

                <tr>
                    <td class="border text-center align-top">14</td>
                    <td class="border px-2 align-top">
                        Amiăng crocidolit
                    </td>
                    <td class="border px-2 align-top">
                        Asbestos crocidolite
                    </td>
                    <td class="border px-2 text-right">2524.10.00</td>
                    <td class="border px-2 text-right">12001-28-4</td>
                </tr>

                <tr>
                    <td class="border text-center align-top">15</td>
                    <td class="border px-2 align-top">
                        Amiăng amosit
                    </td>
                    <td class="border px-2 align-top">
                        Asbestos amosite
                    </td>
                    <td class="border px-2 text-right">2524.90.00</td>
                    <td class="border px-2 text-right">12172-73-5</td>
                </tr>

                <tr>
                    <td class="border text-center">16</td>
                    <td class="border px-2">
                        Amiăng anthophyllit
                    </td>
                    <td class="border px-2">
                        Asbestos anthophyllite
                    </td>
                    <td class="border px-2 text-right">2524.90.00</td>
                    <td class="border px-2 text-right">
                        <div>17068-78-9</div>
                        <div>77536-67-5</div>
                    </td>
                </tr>

                <tr>
                    <td class="border text-center align-top">17</td>
                    <td class="border px-2 align-top">
                        Amiăng actinolit
                    </td>
                    <td class="border px-2 align-top">
                        Asbestos actinolite
                    </td>
                    <td class="border px-2 text-right">2524.90.00</td>
                    <td class="border px-2 text-right">2524.90.00</td>
                </tr>

                <tr>
                    <td class="border text-center align-top">18</td>
                    <td class="border px-2 align-top">
                        Amiăng tremolit
                    </td>
                    <td class="border px-2 align-top">
                        Asbestos tremolite
                    </td>
                    <td class="border px-2 text-right">2524.90.00</td>
                    <td class="border px-2 text-right">77536-68-6</td>
                </tr>
                </tbody>
            </table>
        </div>
    </a-modal>
</template>
