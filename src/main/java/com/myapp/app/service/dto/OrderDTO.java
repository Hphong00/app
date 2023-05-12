package com.myapp.app.service.dto;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

/**
 * A DTO for the {@link com.myapp.app.domain.Order} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class OrderDTO implements Serializable {

    private UUID id;

    private UUID userId;

    private UUID shippingId;

    private UUID paymentId;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public UUID getShippingId() {
        return shippingId;
    }

    public void setShippingId(UUID shippingId) {
        this.shippingId = shippingId;
    }

    public UUID getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(UUID paymentId) {
        this.paymentId = paymentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrderDTO)) {
            return false;
        }

        OrderDTO orderDTO = (OrderDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, orderDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OrderDTO{" +
            "id='" + getId() + "'" +
            ", userId='" + getUserId() + "'" +
            ", shippingId='" + getShippingId() + "'" +
            ", paymentId='" + getPaymentId() + "'" +
            "}";
    }
}
