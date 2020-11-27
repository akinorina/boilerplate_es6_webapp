import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Logout from '../../../src/views/Logout.vue'
import router from 'vue-router'

describe('views/Index.vue', () => {
  it('render string \'Logout Page.\' on Logout.vue', (done) => {
    const wrapper = shallowMount(Logout, {
      router,
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    expect(wrapper.text()).toMatch('ログアウトしました。')

    done()
  })

  it('TOPへ戻る', (done) => {
    const wrapper = shallowMount(Logout, {
      router,
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    //
    expect(wrapper.find('.page__links').text()).toBe('TOPへ戻る')

    done()
  })
})
