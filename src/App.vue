<template>
    <div>
        <p>Current Time: {{ dateTime.toISOString() }}</p>
        <div>
            <button @click="print">
                Print console logs and trigger debugger
            </button>
        </div>
        <div style="margin-top: 20px">
            <button @click="asyncPrint">
                Async print (2 seconds)
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Options, Vue } from 'vue-class-component'

    // @vue/component
    @Options({})
    export default class HomePage extends Vue {
        public dateTime: Date = new Date()
        public dateTimeIntervalId?: number
        public asyncPrintTimeoutId?: number

        public created() {
            this.dateTimeIntervalId = setInterval(() => {
                this.dateTime = new Date()
            }, 1000)
        }

        public destroyed() {
            if (typeof this.dateTimeIntervalId !== 'undefined') {
                clearInterval(this.dateTimeIntervalId)
                delete this.dateTimeIntervalId
            }
            if (typeof this.asyncPrintTimeoutId !== 'undefined') {
                clearTimeout(this.asyncPrintTimeoutId)
                delete this.asyncPrintTimeoutId
            }
        }

        public print(e: MouseEvent) {
            e.preventDefault()
            console.log('debugger into : expected line App.vue:46')
            debugger
            console.log('debugger over : expected line App.vue:48')
        }

        public async asyncPrint(): Promise<void> {
            if (this.asyncPrintTimeoutId) {
                clearTimeout(this.asyncPrintTimeoutId)
                delete this.asyncPrintTimeoutId
            }
            await this.asyncPrintFunction()
            console.log('async resolve : expected line App.vue:57')
        }

        public async asyncPrintFunction(): Promise<void> {
            return new Promise(resolve => {
                this.asyncPrintTimeoutId = setTimeout(() => {
                    console.log('async promise : expected line App.vue:63')
                    delete this.asyncPrintTimeoutId
                    resolve()
                }, 2000)
            })
        }
    }
</script>
