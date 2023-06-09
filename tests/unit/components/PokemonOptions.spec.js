import PokemonOptions from '@/components/PokemonOptions.vue';
import { shallowMount } from '@vue/test-utils';
import { pokemons } from '../mocks/pokemons.mocks';

describe('Pokemon Options', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons,
      },
    });
  });

  test('should match with snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should show four options success', () => {
    const liTags = wrapper.findAll('li');
    expect(liTags.length).toBe(4);

    expect(liTags[0].text()).toBe('bulbasaur');
    expect(liTags[1].text()).toBe('ivysaur');
    expect(liTags[2].text()).toBe('venusaur');
    expect(liTags[3].text()).toBe('charmander');
  });

  test('should emmit selection with params', () => {
    const [li1, li2, li3, li4] = wrapper.findAll('li');

    li1.trigger('click');
    li2.trigger('click');
    li3.trigger('click');
    li4.trigger('click');

    // console.log(wrapper.emitted('selection'));

    expect(wrapper.emitted('selection').length).toBe(4);
    expect(wrapper.emitted('selection')[0]).toEqual([11]);
    expect(wrapper.emitted('selection')[1]).toEqual([202]);
    expect(wrapper.emitted('selection')[2]).toEqual([343]);
    expect(wrapper.emitted('selection')[3]).toEqual([64]);
  });
});
