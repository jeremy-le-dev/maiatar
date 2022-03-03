<template>
  <div class="AvatarGenerator"  :class="{'filter blur-sm': !address}">
    <p><span class="font-semibold">{{this.hashs.length}}</span> maiatars already created<!--, don't wait!--></p>
    <br>
<!--    <button type="button" @click="exportCsvOfPossibilities" class="inline-flex items-center px-4 py-2 mb-3 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150" :class="{'cursor-not-allowed': isLoading}" :disabled="isLoading">
      <svg v-show="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span v-show="isLoading">Processing...</span>
      <span v-show="!isLoading">Set Possibilities</span>
    </button>-->
    <span>
      <div style="height: 160px; width: 160px; overflow: hidden; margin: auto;">
        <div class="box-pre-export mx-auto border-1 bg-gray-100 rounded-full overflow-hidden relative" style="width: 1600px; height: 1600px; transform: scale(0.1); transform-origin: 0 0; -webkit-transform: scale(0.1);  -webkit-transform-origin: 0 0;  -moz-transform: scale(0.1); -moz-transform-origin: 0 0;">
          <div class="relative w-full h-full">
            <!-- Avatar -->
            <div class="absolute left-0 top-0" style="height: 1600px; width: 1600px;" v-for="(theme, id) in avatarParams" v-bind:key="id"
                 :style="{ 'z-index': avatarParams[id].index }">
              <SimpleSVG :src="modelSvgUrl(id, avatarParams[id].selectedModel)"
                         :fill="colorToHexa(avatarParams[id].selectedColor)" fill-class-name="fill-to-change"
                         style="width: 1600px; height: 1600px;" width="1600" height="1600"></SimpleSVG>
            </div>
          </div>
        </div>
        <div class="box-pre-export mx-auto border-1 bg-gray-100 rounded-full overflow-hidden relative" style="width: 1600px; height: 1600px; position: fixed; left: -16000px; top: -16000px;">
          <div class="box-export relative w-full h-full">
            <!-- Avatar -->
            <div class="absolute left-0 top-0" style="height: 1600px; width: 1600px;" v-for="(theme, id) in avatarParams" v-bind:key="id"
                 :style="{ 'z-index': avatarParams[id].index }">
              <SimpleSVG :src="modelSvgUrl(id, avatarParams[id].selectedModel)"
                         :fill="colorToHexa(avatarParams[id].selectedColor)" fill-class-name="fill-to-change"
                         style="width: 1600px; height: 1600px;" width="1600" height="1600"></SimpleSVG>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center py-5">
        <button @click="onRandomize" class="px-3 py-2 text-sm rounded font-semibold">
          Randomize&nbsp;<i class="fas fa-random align-middle"></i>
        </button>
        <br>
        <br>
        <span v-show="isAlreadyExported" class="text-red-500">This combination has already been created.</span>
        <br v-show="isAlreadyExported">
        <br v-show="isAlreadyExported">
        <button v-if="address" @click="onExport();" :disabled="isAlreadyExported" :class="{'opacity-75 cursor-not-allowed': isAlreadyExported}" class="bg-blue-600 px-3 py-2 text-lg rounded font-semibold text-white dark:bg-blue-300">
          <span v-show="!exportLoading">
<!--            Get this NFT for 0.1 $EGLD&nbsp;<i class="fas fa-long-arrow-alt-down align-middle"></i>-->
            Download&nbsp;&nbsp;<i class="fas fa-long-arrow-alt-down align-middle"></i>
          </span>
          <span v-show="exportLoading">
            Waiting&nbsp;&nbsp;<svg class="animate-spin ml-1 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          </span>
        </button>
      </div>
      <div class="flex flex-wrap justify-center justify-around">
        <div class="w-1/2 md:w-1/4 text-gray-500 p-4" v-for="(theme, id) in avatarParams" v-bind:key="id">
          <!-- Label -->
          <div class="uppercase text-sm tracking-wider py-4">{{ avatarParams[id].label }}</div>

          <!-- Model -->
          <div class="flex" v-if="avatarParams[id].models">
            <button class="flex-1" @click="onPreviousModel(id)">
              <i class="fas fa-chevron-left" v-if="avatarParams[id].models.length > 1"></i>
            </button>
            <div class="flex-auto">
              <div class="overflow-hidden rounded-full m-1" v-for="(modelId, modelIndex) in avatarParams[id].models"
                   v-bind:key="modelIndex" v-show="modelId === avatarParams[id].selectedModel">
                <SimpleSVG :src="modelSvgUrl(id, modelId)" :fill="colorToHexa(avatarParams[id].selectedColor)"
                           fill-class-name="fill-to-change" width="100%" height="auto"></SimpleSVG>
              </div>
            </div>
            <button class="flex-1" @click="onNextModel(id)">
              <i class="fas fa-chevron-right" v-if="avatarParams[id].models.length > 1"></i>
            </button>
          </div>

          <!-- Color -->
          <div class="flex flex-wrap justify-center" v-if="avatarParams[id].colors">
            <button class="w-5 h-5 rounded border-0 m-1 shadow" v-for="color in avatarParams[id].colors"
                    v-bind:key="color" :style="{ 'background-color': '#'+color }" @click="selectColor(id, color)">
              <i class="fas fa-check text-white text-xs text-center align-middle leading-5 mb-1"
                 v-show="avatarParams[id].selectedColor === color"></i>
            </button>
          </div>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
// import {ProxyProvider, NetworkConfig, Address, Account, Balance, ContractFunction, GasLimit, SmartContract, TokenIdentifierValue, UserSecretKey, UserSigner} from "@elrondnetwork/erdjs";
// import PrivateKey from '../assets/private/key.json';
import {SimpleSVG} from 'vue-simple-svg';
import html2canvas from 'html2canvas';
import AvatarParams from '../assets/avatars/config.json';
import Assets from '../assets/avatars/Assets';
import JSum from 'jsum';
import { db } from '@/main';
import { collection, getDocs, query, doc, where, setDoc } from 'firebase/firestore';

export default {
  name: 'AvatarGenerator',
  components: {
    SimpleSVG,
  },
  props: {
    address: {
      required: false,
      default: '',
    }
  },
  data() {
    return {
      avatarParams: AvatarParams,
      assets: Assets,
      exportLoading: false,
      hashs: [],
      avatarsCollection: collection(db, 'avatars'),
      currentCollection: doc(db, `collections/H5OxTkh3KXpUwtf36qjo`),
      isLoading: false,
      isAlreadyExported: false,
    }
  },
  created() {
    for (let themeId in this.avatarParams) {
      this.avatarParams[themeId].selectedModel = this.avatarParams[themeId].defaultModel;
      this.avatarParams[themeId].selectedColor = this.avatarParams[themeId].defaultColor;
    }
    this.onRandomize();
    this.updateExistingPossibilities();
  },
  methods: {
    /*async onPaidNft() {
      // Signer
      const signer = new UserSigner(UserSecretKey.fromString(PrivateKey.key));

      // Network config
      let provider = new ProxyProvider("https://devnet-api.elrond.com");
      // let provider = new ProxyProvider("https://api.elrond.com");
      await NetworkConfig.getDefault().sync(provider);
      console.log(NetworkConfig.getDefault().MinGasPrice);
      console.log(NetworkConfig.getDefault().ChainID);

      // My Account
      const myAddress = 'erd1tm40mw3hf36kd4f4n5kgzzzxp34gjkwm02tvuz8cll8yux07z09q4tyuyv';
      // const myAccount = new Account(new Address(myAddress));
      // myAccount.login();

      // Get Account
      let addressOfAlice = new Address(this.address);
      let alice = new Account(addressOfAlice);
      await alice.sync(provider);
      console.log(alice.nonce);
      console.log(alice.balance);

      // Create Non Fungible Contract
      let contract1 = new SmartContract({ address: new Address(myAddress) });
      let tx1 = contract1.call({
        func: new ContractFunction("issueNonFungible"),
        gasLimit: new GasLimit(60000000),
        value: Balance.egld(0.05),
        receiver: new Address("erd1qqqqqqqqqqqqqpgq3ytm9m8dpeud35v3us20vsafp77smqghd8ss4jtm0q"),
        args: [
            new TokenIdentifierValue('416c696365546f6b656e73'),
            new TokenIdentifierValue('414c43')
          // new U64Value(new Buffer("Your Maiatar "+Math.floor(Math.random())).toString('hex')),
          // new U64Value(new Buffer('MAIATAR').toString('hex'))
        ],
      });

      tx1.setNonce(alice.nonce);
      await signer.sign(tx1);
      await tx1.send(provider);
      console.error('TX1 DATA', tx1.getData());

      // Create Role Assign Transaction
      /!*let contract2 = new SmartContract({ address: new Address(myAddress) });
      let tx2 = contract2.call({
        func: new ContractFunction("setSpecialRole"),
        gasLimit: new GasLimit(60000000),
        value: new Balance(50000000000000000),
        receiver: new Address("erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u"), // moi
        args: [
          new Buffer('MAIATAR').toString('hex'),
          new Buffer("ESDTRoleNFTCreate").toString('hex'),
          new Buffer("ESDTRoleNFTBurn").toString('hex'),
        ],
      });

      tx2.setNonce(alice.nonce);
      // await signer.sign(tx2);
      await tx2.send(provider);*!/
    },*/
    async onExport() {
      if (this.isAlreadyExported) {
        return;
      }
      const checkSum = this.checkSum(this.avatarParams);
      await this.updateExistingPossibilities();
      if (!this.hashs.map(hash => hash.hash).includes(checkSum)) {
        this.exportLoading = true;
        setTimeout(async () => {
          // console.error('onExport');
          const node = document.getElementsByClassName('box-export')[0]
          window.scroll(0, 0);
          const canvas = await html2canvas(node);
          const dataUrl = canvas.toDataURL();
          const link1 = document.createElement('a')
          link1.download = 'maiatar.png'
          link1.href = dataUrl
          document.body.appendChild(link1)
          link1.click()
          link1.remove()
          await this.setNewPossibility(this.getAvatarConfig(this.avatarParams), checkSum)
          this.checkIfAlreadExported(checkSum);
          this.exportLoading = false;
        }, 500);
      } else {
        this.isAlreadyExported = true;
      }
    },
    onRandomize() {
      for (let themeId in this.avatarParams) {
        if (this.avatarParams[themeId]) {
          if (this.avatarParams[themeId].models) {
            this.selectModel(themeId, this.avatarParams[themeId].models[this.getRandomIndex(this.avatarParams[themeId].models.length - 1)]);
          }
          if (this.avatarParams[themeId].colors) {
            this.selectColor(themeId, this.avatarParams[themeId].colors[this.getRandomIndex(this.avatarParams[themeId].colors.length - 1)]);
          }
        }
      }
    },
    getRandomIndex(max) {
      return Math.floor(Math.random() * max);
    },
    onPreviousModel(themeId) {
      const currentIndex = this.avatarParams[themeId].models.indexOf(this.avatarParams[themeId].selectedModel);
      let previousIndex = currentIndex - 1;
      if (previousIndex < 0) {
        previousIndex = this.avatarParams[themeId].models.length - 1;
      }
      this.selectModel(themeId, this.avatarParams[themeId].models[previousIndex]);
    },
    onNextModel(themeId) {
      const currentIndex = this.avatarParams[themeId].models.indexOf(this.avatarParams[themeId].selectedModel);
      let nextIndex = currentIndex + 1;
      if (nextIndex > this.avatarParams[themeId].models.length - 1) {
        nextIndex = 0;
      }
      this.selectModel(themeId, this.avatarParams[themeId].models[nextIndex]);
    },
    selectModel(themeId, model) {
      this.avatarParams[themeId] = Object.assign({}, this.avatarParams[themeId], {selectedModel: model})
      const checkSum = this.checkSum(this.avatarParams);
      this.checkIfAlreadExported(checkSum);
    },
    selectColor(themeId, color) {
      this.avatarParams[themeId] = Object.assign({}, this.avatarParams[themeId], {selectedColor: color})
      const checkSum = this.checkSum(this.avatarParams);
      this.checkIfAlreadExported(checkSum);
    },
    modelSvgUrl(id, modelId) {
      if (id && modelId && this.assets && this.assets[id.toLowerCase()] && this.assets[id.toLowerCase()][modelId.toLowerCase()]) {
        return this.assets[id.toLowerCase()][modelId.toLowerCase()];
      }
      return '';
    },
    colorToHexa(color) {
      return `#${color}`;
    },
    getAvatarConfig(avatarParams) {
      const avatarConfig = {};
      for (let themeId in avatarParams) {
        if (avatarParams[themeId]) {
          let value = '';
          if (avatarParams[themeId].models) {
            value += avatarParams[themeId].selectedModel;
          } else {
            value += 'null';
          }
          value += '/';
          if (avatarParams[themeId].colors) {
            value += avatarParams[themeId].selectedColor;
          } else {
            value += 'null';
          }
          avatarConfig[themeId] = value
        }
      }
      return avatarConfig;
    },
    checkSum(avatarParams) {
      const avatarConfig = this.getAvatarConfig(avatarParams);
      return JSum.digest(avatarConfig, 'SHA256', 'hex');
    },
    async exportCsvOfPossibilities() {
      this.isLoading = true;
      for (let i = 0; i < 10000; i += 1) {
        this.onRandomize();
        const checkSum = this.checkSum(this.avatarParams);
        if (!this.hashs.map(hash => hash.hash).includes(checkSum)) {
          await this.setNewPossibility(this.getAvatarConfig(this.avatarParams), checkSum)
        }
      }
      // console.error('this.hashs', this.hashs);
      this.isLoading = false;
    },
    async updateExistingPossibilities() {
      const q = query(
          this.avatarsCollection,
          where(
              'collection',
              '==',
              this.currentCollection
          )
      );
      await getDocs(q).then((querySnapshot) => {
        this.hashs = querySnapshot.docs.map(doc => doc.data());
        // console.error('this.hashs', this.hashs);
      });
    },
    async setNewPossibility(config, hash) {
      await setDoc(doc(this.avatarsCollection), {
        collection: this.currentCollection,
        config: config,
        hash: hash,
        id: this.hashs.length,
      });
      await this.updateExistingPossibilities();
    },
    checkIfAlreadExported(checkSum) {
      if (this.hashs.map(hash => hash.hash).includes(checkSum)) {
        this.isAlreadyExported = true;
      } else {
        this.isAlreadyExported = false;
      }
    }
  }
}
</script>

<style>
/*.box-pre-export:before {
  content: '@maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond @maiatar_elrond';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  color: #fff;
  line-height: 300px;
  font-size: 100px;
  pointer-events: none;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  opacity: 0.1;
}*/
.to-pixelize {
  width: 512px;
  height: 512px;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
</style>
