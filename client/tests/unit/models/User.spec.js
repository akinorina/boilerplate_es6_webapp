import axios from 'axios'
import User from '../../../src/models/User'

jest.mock('axios');

describe('models/User.js', () => {
  beforeEach(() => {
  })

  //
  //
  it('User: initial object.', () => {
    // インスタンス生成
    const user = new User()

    // 初期値の確認
    expect(user.id).toBe(null)
    expect(user.name).toBe('')
    expect(user.name_kana).toBe('')
    expect(user.email).toBe('')
    expect(user.password).toBe('')
    expect(user._keys).toEqual(['id', 'name', 'name_kana', 'email', 'password'])
  })

  //
  //
  it('User: load() method. (success)', (done) => {
    // mock of axios
    const resp = JSON.parse('{"data":{"code":0,"message":"ok","data":{"id":1,"name":"鈴木　一郎","name_kana":"すずき　いちろう","email":"suzuki@gmail.com","password":"754068f93ca0903e1db7f0ad3ec5a616179c738f462959dd2380b6e2743680db","createdAt":"2020-11-26T10:26:56.000Z","updatedAt":"2020-11-26T11:09:04.000Z","deletedAt":null}}}')
    axios.get.mockResolvedValue(resp)

    //
    const user = new User()
    user.load({ id: 1 }, (res) => {
      //
      expect(res.code).toBe(0)
      //
      expect(user.id).toBe(1)
      expect(user.name).toBe('鈴木　一郎')
      expect(user.name_kana).toBe('すずき　いちろう')
      expect(user.email).toBe('suzuki@gmail.com')
      done()
    }, (error) => {
      //
      done(error)
    })
  })
  it('User: load() method. (failure)', (done) => {
    // mock of axios
    axios.get.mockRejectedValue()

    //
    const user = new User()
    user.load({ id: 1 }, () => {
      //
      done()
    }, (err) => {
      //
      expect(user.id).toBe(null)
      expect(user.name).toBe('')
      expect(user.name_kana).toBe('')
      expect(user.email).toBe('')
      done(err)
    })
  })

  //
  //
  it('User: create() method. (success)', (done) => {
    // mock of axios
    const resp = JSON.parse('{"data":{"code":0,"message":"ok","data":{"id":4,"name":"鈴木　花子","name_kana":"すずき　はなこ","email":"hanako.suzuki@gmail.com","password":"754068f93ca0903e1db7f0ad3ec5a616179c738f462959dd2380b6e2743680db","updatedAt":"2020-11-27T06:15:35.960Z","createdAt":"2020-11-27T06:15:35.960Z"}}}')
    axios.post.mockResolvedValue(resp)

    //
    const user = new User()
    user.id = null
    user.name = '鈴木　花子'
    user.name_kana = 'すずき　はなこ'
    user.email = 'hanako.suzuki@gmail.com'
    user.password = 'aaaa1111'

    user.create((res) => {
      //
      expect(res.code).toBe(0)
      //
      expect(res.data.id).toBe(4)
      expect(res.data.name).toBe('鈴木　花子')
      expect(res.data.name_kana).toBe('すずき　はなこ')
      expect(res.data.email).toBe('hanako.suzuki@gmail.com')
      expect(res.data.password).toBe('754068f93ca0903e1db7f0ad3ec5a616179c738f462959dd2380b6e2743680db')
      //
      expect(user.id).toBe(4)
      expect(user.name).toBe('鈴木　花子')
      expect(user.name_kana).toBe('すずき　はなこ')
      expect(user.email).toBe('hanako.suzuki@gmail.com')
      expect(user.password).toBe('754068f93ca0903e1db7f0ad3ec5a616179c738f462959dd2380b6e2743680db')
      //
      done()
    }, (error) => {
      //
      done(error)
    })
  })
  it('User: create() method. (failure)', (done) => {
    // mock of axios
    axios.post.mockRejectedValue()

    //
    const user = new User()
    user.id = null
    user.name = '鈴木　花子'
    user.name_kana = 'すずき　はなこ'
    user.email = 'hanako.suzuki@gmail.com'
    user.password = 'aaaa1111'

    user.create((res) => {
      //
      done()
    }, (error) => {
      //
      expect(user.id).toBe(null)
      expect(user.name).toBe('鈴木　花子')
      expect(user.name_kana).toBe('すずき　はなこ')
      expect(user.email).toBe('hanako.suzuki@gmail.com')
      expect(user.password).toBe('aaaa1111')
      done(error)
    })
  })

  //
  //
  it('User: update() method. (success)', (done) => {
    // mock of axios
    const resp = JSON.parse('{"data":{"code":0,"message":"ok","data":{"id":4,"name":"鈴木　花","name_kana":"すずき　はな","email":"hana.suzuki@gmail.com","password":"754068f93ca0903e1db7f0ad3ec5a616179c738f462959dd2380b6e2743680db","createdAt":"2020-11-27T10:12:33.000Z","updatedAt":"2020-11-27T10:13:07.000Z","deletedAt":null}}}')
    axios.put.mockResolvedValue(resp)

    //
    const user = new User()
    user.id = 4
    user.name = '鈴木　花'
    user.name_kana = 'すずき　はな'
    user.email = 'hana.suzuki@gmail.com'
    user.password = '754068f93ca0903e1db7f0ad3ec5a616179c738f462959dd2380b6e2743680db'

    user.update((res) => {
      // リクエストパラメータ
      expect(axios.put.mock.calls[0][0]).toBe('/api/users/4')
      expect(axios.put.mock.calls[0][1]).toEqual({id:4, name: '鈴木　花', name_kana: 'すずき　はな', email: 'hana.suzuki@gmail.com'})

      // レスポンス
      expect(res.code).toBe(0)
      // レスポンス
      expect(user.id).toBe(4)
      expect(user.name).toBe('鈴木　花')
      expect(user.name_kana).toBe('すずき　はな')
      expect(user.email).toBe('hana.suzuki@gmail.com')
      expect(user.password).toBe('754068f93ca0903e1db7f0ad3ec5a616179c738f462959dd2380b6e2743680db')
      done()
    }, (error) => {
      //
      done(error)
    })
  })
  it('User: update() method. (failure)', (done) => {
    // mock of axios
    axios.put.mockRejectedValue()

    //
    const user = new User()
    user.id = 4
    user.name = '鈴木　花'
    user.name_kana = 'すずき　はな'
    user.email = 'hana.suzuki@gmail.com'
    user.password = '754068f93ca0903e1db7f0ad3ec5a616179c738f462959dd2380b6e2743680db'

    user.update((res) => {
      //
      done()
    }, (error) => {
      // レスポンス
      expect(user.id).toBe(4)
      expect(user.name).toBe('鈴木　花')
      expect(user.name_kana).toBe('すずき　はな')
      expect(user.email).toBe('hana.suzuki@gmail.com')
      expect(user.password).toBe('754068f93ca0903e1db7f0ad3ec5a616179c738f462959dd2380b6e2743680db')
      done(error)
    })
  })

  //
  //
  it('User: delete() method. (success)', (done) => {
    // mock of axios
    const resp = JSON.parse('{"data":{"code":0,"message":"ok","count":1,"data":null}}')
    axios.delete.mockResolvedValue(resp)

    //
    const user = new User()
    user.id = 4
    user.name = '鈴木　花'
    user.name_kana = 'すずき　はな'
    user.email = 'hana.suzuki@gmail.com'
    user.password = 'aaaa1111'

    user.delete((res) => {
      //
      expect(res.code).toBe(0)
      //
      expect(user.id).toBe(null)
      expect(user.name).toBe('')
      expect(user.name_kana).toBe('')
      expect(user.email).toBe('')
      expect(user.password).toBe('')
      done()
    }, (error) => {
      //
      done(error)
    })
  })
  it('User: delete() method. (failure)', (done) => {
    // mock of axios
    axios.delete.mockRejectedValue()

    //
    const user = new User()
    user.id = 4
    user.name = '鈴木　花'
    user.name_kana = 'すずき　はな'
    user.email = 'hana.suzuki@gmail.com'
    user.password = 'aaaa1111'

    user.delete((res) => {
      //
      done()
    }, (error) => {
      //
      expect(user.id).toBe(4)
      expect(user.name).toBe('鈴木　花')
      expect(user.name_kana).toBe('すずき　はな')
      expect(user.email).toBe('hana.suzuki@gmail.com')
      done(error)
    })
  })
  it('User: delete() method. (failure: bad id)', (done) => {
    //
    const user = new User()
    user.id = null
    user.name = '鈴木　花'
    user.name_kana = 'すずき　はな'
    user.email = 'hana.suzuki@gmail.com'
    user.password = 'aaaa1111'

    user.delete((res) => {
      //
    }, (error) => {
      //
      done()
    })
  })

  //
  //
  it('User: changePassword() method. (success)', (done) => {
    // mock of axios
    const resp = JSON.parse('{"data":{"code":0,"message":"ok","count":1,"data":null}}')
    axios.put.mockResolvedValue(resp)

    //
    const params = {}
    params.id = 1
    params.password = 'aaaa1111'
    params.new_password = 'aaaa2222'

    const user = new User()
    user.changePassword(params, (res) => {
      //
      expect(res.code).toBe(0)
      done()
    }, (error) => {
      //
      done(error)
    })
  })
  it('User: changePassword() method. (failure)', (done) => {
    // mock of axios
    axios.put.mockRejectedValue()

    //
    const params = {}
    params.id = 1
    params.password = 'aaaa1111'
    params.new_password = 'aaaa2222'

    const user = new User()
    user.changePassword(params, (res) => {
      //
      done()
    }, (error) => {
      //
      done(error)
    })
  })
  it('User: changePassword() method. (failure: bad id)', (done) => {
    //
    const params = {}
    params.id = null
    params.password = 'aaaa1111'
    params.new_password = 'aaaa2222'

    const user = new User()
    user.changePassword(params, (res) => {
      //
      done()
    }, (error) => {
      //
      done(error)
    })
  })
})
