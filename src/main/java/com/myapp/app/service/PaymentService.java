package com.myapp.app.service;

import com.myapp.app.service.dto.PaymentDTO;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.myapp.app.domain.Payment}.
 */
public interface PaymentService {
    /**
     * Save a payment.
     *
     * @param paymentDTO the entity to save.
     * @return the persisted entity.
     */
    PaymentDTO save(PaymentDTO paymentDTO);

    /**
     * Updates a payment.
     *
     * @param paymentDTO the entity to update.
     * @return the persisted entity.
     */
    PaymentDTO update(PaymentDTO paymentDTO);

    /**
     * Partially updates a payment.
     *
     * @param paymentDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<PaymentDTO> partialUpdate(PaymentDTO paymentDTO);

    /**
     * Get all the payments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<PaymentDTO> findAll(Pageable pageable);

    /**
     * Get the "id" payment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PaymentDTO> findOne(UUID id);

    /**
     * Delete the "id" payment.
     *
     * @param id the id of the entity.
     */
    void delete(UUID id);
}
