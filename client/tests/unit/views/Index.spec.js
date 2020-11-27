import { shallowMount } from '@vue/test-utils'
import Index from '../../../src/views/Index.vue'

describe('views/Index.vue', () => {
  it('render string \'Index Page.\' on Index.vue', (done) => {
    const wrapper = shallowMount(Index, {
    })
    expect(wrapper.text()).toMatch('Index Page.')

    done()
  })
})
