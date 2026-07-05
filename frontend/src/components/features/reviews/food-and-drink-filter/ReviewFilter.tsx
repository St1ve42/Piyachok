'use client'
import { Button, Dropdown, Header, Label } from "@heroui/react";
import {Funnel} from "@gravity-ui/icons";
import useReviewFilter from "@/src/components/features/reviews/food-and-drink-filter/useReviewFilter";

const ReviewFilter = () => {
    const {handleFilterChange, ratings} = useReviewFilter()
    return (
        <Dropdown>
            <Button isIconOnly aria-label="Menu" variant="secondary">
                <Funnel/>
            </Button>
            <Dropdown.Popover>
                <Dropdown.Menu onAction={handleFilterChange}>
                    <Dropdown.Section>
                        <Header>Рейтинг </Header>
                        {ratings.map(rating => <Dropdown.Item key={rating} id={rating} textValue={rating.toString()}>
                            <Label>{rating}</Label>
                        </Dropdown.Item>)}
                    </Dropdown.Section>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    )
}

export default ReviewFilter