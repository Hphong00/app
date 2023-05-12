package com.myapp.app.service;

import com.myapp.app.service.dto.ShippingDTO;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.myapp.app.domain.Shipping}.
 */
public interface ShippingService {
    /**
     * Save a shipping.
     *
     * @param shippingDTO the entity to save.
     * @return the persisted entity.
     */
    ShippingDTO save(ShippingDTO shippingDTO);

    /**
     * Updates a shipping.
     *
     * @param shippingDTO the entity to update.
     * @return the persisted entity.
     */
    ShippingDTO update(ShippingDTO shippingDTO);

    /**
     * Partially updates a shipping.
     *
     * @param shippingDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ShippingDTO> partialUpdate(ShippingDTO shippingDTO);

    /**
     * Get all the shippings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ShippingDTO> findAll(Pageable pageable);

    /**
     * Get the "id" shipping.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ShippingDTO> findOne(UUID id);

    /**
     * Delete the "id" shipping.
     *
     * @param id the id of the entity.
     */
    void delete(UUID id);
}
