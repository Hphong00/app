package com.myapp.app.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.myapp.app.IntegrationTest;
import com.myapp.app.domain.Shipping;
import com.myapp.app.repository.ShippingRepository;
import com.myapp.app.service.dto.ShippingDTO;
import com.myapp.app.service.mapper.ShippingMapper;
import java.util.List;
import java.util.UUID;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ShippingResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ShippingResourceIT {

    private static final UUID DEFAULT_USER_ID = UUID.randomUUID();
    private static final UUID UPDATED_USER_ID = UUID.randomUUID();

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_STATE = "AAAAAAAAAA";
    private static final String UPDATED_STATE = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final String DEFAULT_POSTAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_POSTAL_CODE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/shippings";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ShippingRepository shippingRepository;

    @Autowired
    private ShippingMapper shippingMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restShippingMockMvc;

    private Shipping shipping;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Shipping createEntity(EntityManager em) {
        Shipping shipping = new Shipping()
            .userId(DEFAULT_USER_ID)
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .phone(DEFAULT_PHONE)
            .address(DEFAULT_ADDRESS)
            .city(DEFAULT_CITY)
            .state(DEFAULT_STATE)
            .country(DEFAULT_COUNTRY)
            .postalCode(DEFAULT_POSTAL_CODE);
        return shipping;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Shipping createUpdatedEntity(EntityManager em) {
        Shipping shipping = new Shipping()
            .userId(UPDATED_USER_ID)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .phone(UPDATED_PHONE)
            .address(UPDATED_ADDRESS)
            .city(UPDATED_CITY)
            .state(UPDATED_STATE)
            .country(UPDATED_COUNTRY)
            .postalCode(UPDATED_POSTAL_CODE);
        return shipping;
    }

    @BeforeEach
    public void initTest() {
        shipping = createEntity(em);
    }

    @Test
    @Transactional
    void createShipping() throws Exception {
        int databaseSizeBeforeCreate = shippingRepository.findAll().size();
        // Create the Shipping
        ShippingDTO shippingDTO = shippingMapper.toDto(shipping);
        restShippingMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shippingDTO)))
            .andExpect(status().isCreated());

        // Validate the Shipping in the database
        List<Shipping> shippingList = shippingRepository.findAll();
        assertThat(shippingList).hasSize(databaseSizeBeforeCreate + 1);
        Shipping testShipping = shippingList.get(shippingList.size() - 1);
        assertThat(testShipping.getUserId()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testShipping.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testShipping.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testShipping.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testShipping.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testShipping.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testShipping.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testShipping.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testShipping.getPostalCode()).isEqualTo(DEFAULT_POSTAL_CODE);
    }

    @Test
    @Transactional
    void createShippingWithExistingId() throws Exception {
        // Create the Shipping with an existing ID
        shippingRepository.saveAndFlush(shipping);
        ShippingDTO shippingDTO = shippingMapper.toDto(shipping);

        int databaseSizeBeforeCreate = shippingRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restShippingMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shippingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Shipping in the database
        List<Shipping> shippingList = shippingRepository.findAll();
        assertThat(shippingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllShippings() throws Exception {
        // Initialize the database
        shippingRepository.saveAndFlush(shipping);

        // Get all the shippingList
        restShippingMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shipping.getId().toString())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.toString())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE)))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE)))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY)))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE)));
    }

    @Test
    @Transactional
    void getShipping() throws Exception {
        // Initialize the database
        shippingRepository.saveAndFlush(shipping);

        // Get the shipping
        restShippingMockMvc
            .perform(get(ENTITY_API_URL_ID, shipping.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(shipping.getId().toString()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID.toString()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY))
            .andExpect(jsonPath("$.postalCode").value(DEFAULT_POSTAL_CODE));
    }

    @Test
    @Transactional
    void getNonExistingShipping() throws Exception {
        // Get the shipping
        restShippingMockMvc.perform(get(ENTITY_API_URL_ID, UUID.randomUUID().toString())).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingShipping() throws Exception {
        // Initialize the database
        shippingRepository.saveAndFlush(shipping);

        int databaseSizeBeforeUpdate = shippingRepository.findAll().size();

        // Update the shipping
        Shipping updatedShipping = shippingRepository.findById(shipping.getId()).get();
        // Disconnect from session so that the updates on updatedShipping are not directly saved in db
        em.detach(updatedShipping);
        updatedShipping
            .userId(UPDATED_USER_ID)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .phone(UPDATED_PHONE)
            .address(UPDATED_ADDRESS)
            .city(UPDATED_CITY)
            .state(UPDATED_STATE)
            .country(UPDATED_COUNTRY)
            .postalCode(UPDATED_POSTAL_CODE);
        ShippingDTO shippingDTO = shippingMapper.toDto(updatedShipping);

        restShippingMockMvc
            .perform(
                put(ENTITY_API_URL_ID, shippingDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(shippingDTO))
            )
            .andExpect(status().isOk());

        // Validate the Shipping in the database
        List<Shipping> shippingList = shippingRepository.findAll();
        assertThat(shippingList).hasSize(databaseSizeBeforeUpdate);
        Shipping testShipping = shippingList.get(shippingList.size() - 1);
        assertThat(testShipping.getUserId()).isEqualTo(UPDATED_USER_ID);
        assertThat(testShipping.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testShipping.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testShipping.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testShipping.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testShipping.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testShipping.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testShipping.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testShipping.getPostalCode()).isEqualTo(UPDATED_POSTAL_CODE);
    }

    @Test
    @Transactional
    void putNonExistingShipping() throws Exception {
        int databaseSizeBeforeUpdate = shippingRepository.findAll().size();
        shipping.setId(UUID.randomUUID());

        // Create the Shipping
        ShippingDTO shippingDTO = shippingMapper.toDto(shipping);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShippingMockMvc
            .perform(
                put(ENTITY_API_URL_ID, shippingDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(shippingDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Shipping in the database
        List<Shipping> shippingList = shippingRepository.findAll();
        assertThat(shippingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchShipping() throws Exception {
        int databaseSizeBeforeUpdate = shippingRepository.findAll().size();
        shipping.setId(UUID.randomUUID());

        // Create the Shipping
        ShippingDTO shippingDTO = shippingMapper.toDto(shipping);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShippingMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(shippingDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Shipping in the database
        List<Shipping> shippingList = shippingRepository.findAll();
        assertThat(shippingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamShipping() throws Exception {
        int databaseSizeBeforeUpdate = shippingRepository.findAll().size();
        shipping.setId(UUID.randomUUID());

        // Create the Shipping
        ShippingDTO shippingDTO = shippingMapper.toDto(shipping);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShippingMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shippingDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Shipping in the database
        List<Shipping> shippingList = shippingRepository.findAll();
        assertThat(shippingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateShippingWithPatch() throws Exception {
        // Initialize the database
        shippingRepository.saveAndFlush(shipping);

        int databaseSizeBeforeUpdate = shippingRepository.findAll().size();

        // Update the shipping using partial update
        Shipping partialUpdatedShipping = new Shipping();
        partialUpdatedShipping.setId(shipping.getId());

        partialUpdatedShipping.userId(UPDATED_USER_ID).city(UPDATED_CITY);

        restShippingMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedShipping.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedShipping))
            )
            .andExpect(status().isOk());

        // Validate the Shipping in the database
        List<Shipping> shippingList = shippingRepository.findAll();
        assertThat(shippingList).hasSize(databaseSizeBeforeUpdate);
        Shipping testShipping = shippingList.get(shippingList.size() - 1);
        assertThat(testShipping.getUserId()).isEqualTo(UPDATED_USER_ID);
        assertThat(testShipping.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testShipping.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testShipping.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testShipping.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testShipping.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testShipping.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testShipping.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testShipping.getPostalCode()).isEqualTo(DEFAULT_POSTAL_CODE);
    }

    @Test
    @Transactional
    void fullUpdateShippingWithPatch() throws Exception {
        // Initialize the database
        shippingRepository.saveAndFlush(shipping);

        int databaseSizeBeforeUpdate = shippingRepository.findAll().size();

        // Update the shipping using partial update
        Shipping partialUpdatedShipping = new Shipping();
        partialUpdatedShipping.setId(shipping.getId());

        partialUpdatedShipping
            .userId(UPDATED_USER_ID)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .phone(UPDATED_PHONE)
            .address(UPDATED_ADDRESS)
            .city(UPDATED_CITY)
            .state(UPDATED_STATE)
            .country(UPDATED_COUNTRY)
            .postalCode(UPDATED_POSTAL_CODE);

        restShippingMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedShipping.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedShipping))
            )
            .andExpect(status().isOk());

        // Validate the Shipping in the database
        List<Shipping> shippingList = shippingRepository.findAll();
        assertThat(shippingList).hasSize(databaseSizeBeforeUpdate);
        Shipping testShipping = shippingList.get(shippingList.size() - 1);
        assertThat(testShipping.getUserId()).isEqualTo(UPDATED_USER_ID);
        assertThat(testShipping.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testShipping.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testShipping.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testShipping.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testShipping.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testShipping.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testShipping.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testShipping.getPostalCode()).isEqualTo(UPDATED_POSTAL_CODE);
    }

    @Test
    @Transactional
    void patchNonExistingShipping() throws Exception {
        int databaseSizeBeforeUpdate = shippingRepository.findAll().size();
        shipping.setId(UUID.randomUUID());

        // Create the Shipping
        ShippingDTO shippingDTO = shippingMapper.toDto(shipping);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShippingMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, shippingDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(shippingDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Shipping in the database
        List<Shipping> shippingList = shippingRepository.findAll();
        assertThat(shippingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchShipping() throws Exception {
        int databaseSizeBeforeUpdate = shippingRepository.findAll().size();
        shipping.setId(UUID.randomUUID());

        // Create the Shipping
        ShippingDTO shippingDTO = shippingMapper.toDto(shipping);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShippingMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(shippingDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Shipping in the database
        List<Shipping> shippingList = shippingRepository.findAll();
        assertThat(shippingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamShipping() throws Exception {
        int databaseSizeBeforeUpdate = shippingRepository.findAll().size();
        shipping.setId(UUID.randomUUID());

        // Create the Shipping
        ShippingDTO shippingDTO = shippingMapper.toDto(shipping);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShippingMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(shippingDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Shipping in the database
        List<Shipping> shippingList = shippingRepository.findAll();
        assertThat(shippingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteShipping() throws Exception {
        // Initialize the database
        shippingRepository.saveAndFlush(shipping);

        int databaseSizeBeforeDelete = shippingRepository.findAll().size();

        // Delete the shipping
        restShippingMockMvc
            .perform(delete(ENTITY_API_URL_ID, shipping.getId().toString()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Shipping> shippingList = shippingRepository.findAll();
        assertThat(shippingList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
